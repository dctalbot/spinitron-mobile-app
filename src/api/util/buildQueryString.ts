// buildQueryString will take an object and return a query string.
// `undefined`, `null`, and empty string values are ignored.
// If the result has zero query parameters, an empty string is returned.
export function buildQueryString(input: Record<string, unknown> = {}): string {
  const result = new URLSearchParams();

  for (const [k, v] of Object.entries(input)) {
    if (v === undefined || v === null || v === "") continue;

    if (Array.isArray(v)) {
      v.forEach((itemVal) => result.append(k, itemVal));
    } else {
      result.set(k, String(v));
    }
  }
  return result.toString();
}
