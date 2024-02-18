// https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
export const spacing = {
  0: 0,
  1: 1,
  2: 2,
  4: 4,
  6: 6,
  8: 8,
  10: 10,
  12: 12,
  14: 14,
  16: 16,
  20: 20,
  24: 24,
  28: 28,
  32: 32,
  36: 36,
  40: 40,
  44: 44,
  48: 48,
  56: 56,
  64: 64,
  80: 80,
  96: 96,
  112: 112,
  128: 128,
  144: 144,
  160: 160,
  176: 176,
  192: 192,
  208: 208,
  224: 224,
  240: 240,
  256: 256,
  288: 288,
  320: 320,
  384: 384,
} as const;

export const fontSize = {
  xs: {
    size: 12,
    lineHeight: 16,
  },
  sm: {
    size: 14,
    lineHeight: 20,
  },
  md: {
    size: 16,
    lineHeight: 24,
  },
  lg: {
    size: 18,
    lineHeight: 28,
  },
  xl: {
    size: 20,
    lineHeight: 28,
  },
  "2xl": {
    size: 24,
    lineHeight: 32,
  },
  "3xl": {
    size: 30,
    lineHeight: 36,
  },
  "4xl": {
    size: 36,
    lineHeight: 40,
  },
  "5xl": {
    size: 48,
    lineHeight: 1,
  },
  "6xl": {
    size: 60,
    lineHeight: 1,
  },
  "7xl": {
    size: 72,
    lineHeight: 1,
  },
  "8xl": {
    size: 96,
    lineHeight: 1,
  },
  "9xl": {
    size: 128,
    lineHeight: 1,
  },
} as const satisfies Record<string, { size: number; lineHeight: number }>;
