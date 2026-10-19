import { expect, test } from "vitest";
import {
  estimateSongArtSize,
  getSongArtSize,
  SONG_ART_MAX,
  SONG_ART_MIN,
} from "./songArtLayout";

test("getSongArtSize uses the smaller side", () => {
  expect(getSongArtSize(300, 200)).toBe(200);
  expect(getSongArtSize(150, 400)).toBe(150);
});

test("getSongArtSize clamps to MIN and MAX", () => {
  expect(getSongArtSize(40, 40)).toBe(SONG_ART_MIN);
  expect(getSongArtSize(800, 800)).toBe(SONG_ART_MAX);
});

test("getSongArtSize floors fractional edges", () => {
  expect(getSongArtSize(200.9, 300)).toBe(200);
});

test("estimateSongArtSize fits a short phone without using half the window", () => {
  // iPhone SE-ish
  const size = estimateSongArtSize({ windowWidth: 375, windowHeight: 667 });
  expect(size).toBeGreaterThanOrEqual(SONG_ART_MIN);
  expect(size).toBeLessThan(Math.floor(667 / 2));
  expect(size).toBeLessThanOrEqual(375 - 24);
});

test("estimateSongArtSize grows on a tall phone but stays under MAX", () => {
  // iPhone 15 Pro Max-ish
  const size = estimateSongArtSize({ windowWidth: 430, windowHeight: 932 });
  expect(size).toBeGreaterThan(200);
  expect(size).toBeLessThanOrEqual(SONG_ART_MAX);
});

test("estimateSongArtSize caps tablet art at MAX", () => {
  // iPad
  const size = estimateSongArtSize({ windowWidth: 1024, windowHeight: 1366 });
  expect(size).toBe(SONG_ART_MAX);
});
