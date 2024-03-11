import { expect, test } from "vitest";
import { buildQueryString } from "./buildQueryString";

test.each([
  [undefined, ""],
  [{}, ""],
  [{ a: "", b: undefined, c: null, d: [] }, ""],
  [{ a: "b" }, "a=b"],
  [{ a: "b", c: "d" }, "a=b&c=d"],
  [{ a: "b", c: undefined }, "a=b"],
  [{ a: 1, c: 2 }, "a=1&c=2"],
  [{ a: [1, 2, "3"] }, "a=1&a=2&a=3"],
  [{ a: "", b: "b", c: ["c"], d: null }, "b=b&c=c"],
])("%s => %s", (input, expected) => {
  expect(buildQueryString(input)).toBe(expected);
});

test("no input", () => {
  expect(buildQueryString()).toBe("");
});
