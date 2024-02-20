export function getResourceID(input: string | URL): number {
  let result = -1;
  const url: URL = typeof input === "string" ? new URL(input) : input;
  const segments = url.pathname.split("/").filter(Boolean);

  if (segments.length > 0) {
    result = Number(segments[segments.length - 1]);
  }

  return result;
}
