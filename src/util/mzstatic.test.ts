import { expect, test } from "vitest";
import { mzstaticUpgrade } from "./mzstatic";

test.each([
  ["", ""],
  ["blah", "blah"],
  [
    "https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/61/d6/c1/61d6c1a3-61c1-4181-fd87-a9b109681411/9332727056574_cover.jpg/170x170bb.jpg",
    "https://is2-ssl.mzstatic.com/image/thumb/Music126/v4/61/d6/c1/61d6c1a3-61c1-4181-fd87-a9b109681411/9332727056574_cover.jpg/555x555.jpg",
  ],
  [
    "https://is2-ssl.mzstatic.com/_cover.jpg/9999x9999.jpg",
    "https://is2-ssl.mzstatic.com/_cover.jpg/555x555.jpg",
  ],
])("%s => %s", (input, expected) => {
  expect(mzstaticUpgrade(input, 555)).toBe(expected);
  expect(mzstaticUpgrade(input, 555.123)).toBe(expected);
});
