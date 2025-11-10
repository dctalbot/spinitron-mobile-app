/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// Simple in-memory cache with TTL
const cache = new Map();

function makeCacheKey(request) {
  const url = new URL(request.url);
  // For resource (ID) endpoints, ignore query params
  if (/\/(api|images)\/\w+\/\d+/.test(url.pathname)) {
    return url.origin + url.pathname;
  }
  // For collections, include query params
  return url.origin + url.pathname + url.search;
}

function isResourcePath(path) {
  return /\/(api|images)\/\w+\/\d+/.test(path);
}

function isCollectionPath(path) {
  return /\/api\/\w+/.test(path) && !isResourcePath(path);
}

function getTTL(path) {
  // 3 min for resources, 30s for spins, 1 min for others
  if (isResourcePath(path)) return 180; // 3 min
  if (/\/api\/spins/.test(path)) return 30; // 30s for spins collection
  return 60; // 1 min default for other collections
}

const SPINITRON_BASE = "https://spinitron.com";

export default {
  async fetch(request, env, _ctx) {
    const url = new URL(request.url);
    const apiKey = env.SPINITRON_API_KEY;
    if (!apiKey) {
      return new Response("Missing SPINITRON_API_KEY", { status: 500 });
    }

    // Only proxy GET requests to /api/ and /images/
    if (request.method !== "GET" || !/^\/(api|images)\//.test(url.pathname)) {
      return new Response("Not found", { status: 404 });
    }

    const cacheKey = makeCacheKey(request);
    const now = Date.now();
    // Check cache
    const cached = cache.get(cacheKey);
    if (cached && cached.expiry > now) {
      return new Response(cached.body, {
        status: 200,
        headers: cached.headers,
      });
    }

    // Proxy request to Spinitron
    const targetUrl = SPINITRON_BASE + url.pathname + url.search;
    const headers = new Headers(request.headers);
    headers.set("Authorization", "Bearer " + apiKey);
    headers.set("accept", "application/json");

    const resp = await fetch(targetUrl, {
      method: "GET",
      headers,
    });
    const body = await resp.arrayBuffer();
    const respHeaders = {};
    for (const [k, v] of resp.headers.entries()) {
      respHeaders[k] = v;
    }

    // Cache only 200 OK responses
    if (resp.status === 200) {
      const ttl = getTTL(url.pathname);
      cache.set(cacheKey, {
        body,
        headers: respHeaders,
        expiry: now + ttl * 1000,
      });
      // If a collection expires, evict all for that collection
      if (isCollectionPath(url.pathname)) {
        setTimeout(
          () => {
            for (const key of cache.keys()) {
              if (key.includes(url.pathname.split("/")[2])) {
                const entry = cache.get(key);
                if (entry && entry.expiry <= Date.now()) {
                  cache.delete(key);
                }
              }
            }
          },
          ttl * 1000 + 1000,
        );
      }
    }

    return new Response(body, {
      status: resp.status,
      headers: resp.headers,
    });
  },
};
