export function mzstaticUpgrade(s: string, size: number) {
  const normalSize = Math.floor(size);
  if (s.includes("mzstatic") && /\/\d+x\d+(bb)?.jpg/.test(s)) {
    return s.replace(/\d+x\d+(bb)?/, `${normalSize}x${normalSize}`);
  }
  return s;
}
