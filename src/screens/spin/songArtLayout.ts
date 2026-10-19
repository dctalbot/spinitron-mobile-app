import { fontSize, spacing } from "../../theme/theme";

/** Minimum album art edge; matches list art / AppImage default. */
export const SONG_ART_MIN = 80;

/** Caps tablet art so it stays proportional rather than edge-to-edge. */
export const SONG_ART_MAX = 420;

/** Play control height used when estimating radio chrome. */
export const SONG_ART_PLAY_SIZE = 60;

/** One 2xl title line + one default persona line for conservative estimates. */
const HEADER_RESERVE = fontSize["2xl"].lineHeight + fontSize.md.lineHeight;

/** Stack header + tab bar approx; keeps first paint undersized vs full window. */
const NAV_CHROME_RESERVE = 100;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/** Largest square that fits in the available box, clamped to MIN/MAX. */
export function getSongArtSize(availableWidth: number, availableHeight: number): number {
  const edge = Math.floor(Math.min(availableWidth, availableHeight));
  return clamp(edge, SONG_ART_MIN, SONG_ART_MAX);
}

/**
 * Conservative first-paint size from window dims.
 * Prefers undersizing so art never overlaps header before onLayout runs.
 */
export function estimateSongArtSize(opts: {
  windowWidth: number;
  windowHeight: number;
}): number {
  const { windowWidth, windowHeight } = opts;

  const screenPadding = spacing[12] * 2;
  const artVerticalPadding = spacing[6] * 2;
  const citationPadding = spacing[6] * 2;
  const citationBand = Math.min(80, windowHeight / 5) + citationPadding;

  const availableWidth = windowWidth - screenPadding;
  const availableHeight =
    windowHeight -
    screenPadding -
    artVerticalPadding -
    citationBand -
    SONG_ART_PLAY_SIZE -
    HEADER_RESERVE -
    NAV_CHROME_RESERVE;

  return getSongArtSize(availableWidth, availableHeight);
}
