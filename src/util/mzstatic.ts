export function mzstaticUpgrade(s: string, size: number) {
  if (s.includes("mzstatic") && /\/\d+x\d+(bb)?.jpg/.test(s)) {
    return s.replace(/\d+x\d+(bb)?/, `${size}x${size}`);
  }
  return s;
}
