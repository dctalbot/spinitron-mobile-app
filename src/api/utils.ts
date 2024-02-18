export function buildQueryString(input: Record<string, unknown> = {}): string {
  const result = new URLSearchParams();

  for (const [k, v] of Object.entries(input)) {
    if (v === undefined || v === null) continue;

    if (Array.isArray(v)) {
      v.forEach((itemVal) => result.append(k, itemVal));
    } else {
      result.set(k, String(v));
    }
  }
  return result.toString();
}
