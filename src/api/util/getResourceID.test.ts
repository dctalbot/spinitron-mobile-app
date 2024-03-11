import { expect, test } from "vitest";
import { getResourceID } from "./getResourceID";

test.each([
  ["http://foo.com/123", 123],
  ["http://foo.com/123/", 123],
  ["http://foo.com/personas/123", 123],
])("%s => %s", (input, expected) => {
  expect(getResourceID(input)).toBe(expected);
  expect(getResourceID(new URL(input))).toBe(expected);
});
