import { expect, test } from "vitest";
import {
  getSpinListItemRowStyle,
  getSpinListItemTextColumnStyle,
  getSpinListItemTextProps,
  SPIN_LIST_ART_SIZE,
} from "./spinListItemLayout";

test("spin list row grows with content instead of clipping", () => {
  const row = getSpinListItemRowStyle();
  expect(row.minHeight).toBe(SPIN_LIST_ART_SIZE);
  expect(row).not.toHaveProperty("height");
  expect(row).not.toHaveProperty("paddingVertical");
  expect(row).not.toHaveProperty("paddingTop");
  expect(row).not.toHaveProperty("paddingBottom");
});

test("spin list text column has no fixed height", () => {
  const textColumn = getSpinListItemTextColumnStyle();
  expect(textColumn).not.toHaveProperty("height");
});

test("spin list text is not truncated so all characters can wrap", () => {
  const textProps = getSpinListItemTextProps();
  expect(textProps).not.toHaveProperty("numberOfLines");
});
