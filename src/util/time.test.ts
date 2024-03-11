import { expect, test, vi } from "vitest";
import { fmtOnAt, getScheduleDayRange, getToday } from "./time";
// import { startOfToday } from "./time";

// test.each([
//   [undefined, ""],
//   [{}, ""],
//   [{ a: "", b: undefined, c: null, d: [] }, ""],
//   [{ a: "b" }, "a=b"],
//   [{ a: "b", c: "d" }, "a=b&c=d"],
//   [{ a: "b", c: undefined }, "a=b"],
//   [{ a: 1, c: 2 }, "a=1&c=2"],
//   [{ a: [1, 2, "3"] }, "a=1&a=2&a=3"],
//   [{ a: "", b: "b", c: ["c"], d: null }, "b=b&c=c"],
// ])("%s => %s", (input, expected) => {
//   expect(buildQueryString(input)).toBe(expected);
// });

// test("startOfToday", () => {
//   const date = new Date(2000, 1, 1, 13, 5);
//   vi.setSystemTime(date);
//   expect(startOfToday()).toBe("2000-02-01T00:00:00-05:00");
// });

test("getToday", () => {
  const date = new Date(2024, 2, 9, 13, 5);
  vi.setSystemTime(date);
  expect(getToday()).toBe("Saturday");
});

test("getScheduleDayRange", () => {
  const date = new Date(2024, 2, 20, 13, 5);
  vi.setSystemTime(date);
  expect(getScheduleDayRange(getToday())).toStrictEqual([
    "2024-03-27T06:00:00-04:00",
    "2024-03-28T05:59:59-04:00",
  ]);
});

test("fmtOnAt", () => {
  const date = new Date(2024, 2, 20, 13, 5);
  vi.setSystemTime(date);
  expect(fmtOnAt("2024-03-20T13:05:00-04:00")).toBe(
    "On March 20, 2024 at 1:05 PM",
  );
});

test("fmtOnAt null", () => {
  expect(fmtOnAt()).toBe("");
});
