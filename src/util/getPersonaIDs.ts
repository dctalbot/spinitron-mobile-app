export function getPersonaIDs(
  input: {
    href?: string | undefined;
  }[] = [],
): number[] {
  const result: number[] = [];

  input.forEach((p) => {
    if (p?.href) {
      const url = new URL(p.href);
      const segments = url.pathname.split("/").filter(Boolean);
      if (segments.length > 0) {
        result.push(Number(segments[segments.length - 1]));
      }
    }
  });

  return result;
}
