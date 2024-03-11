// getResourceID returns the ID route param value if found.
// otherwise, it returns 0.
export function getResourceID(input: string | URL): number {
  let result = 0;

  if (!input) {
    return result;
  }

  const url: URL = typeof input === "string" ? new URL(input) : input;
  const segments = url.pathname.split("/").filter(Boolean);

  if (segments.length > 0) {
    result = Number(segments[segments.length - 1]);
  }

  return result;
}
