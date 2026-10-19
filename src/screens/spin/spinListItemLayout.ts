import { spacing } from "../../theme/theme";

/** Album art edge length; also the minimum row height. */
export const SPIN_LIST_ART_SIZE = 80;

export function getSpinListItemRowStyle() {
  return {
    minHeight: SPIN_LIST_ART_SIZE,
    flexDirection: "row" as const,
    alignItems: "center" as const,
  };
}

export function getSpinListItemTextColumnStyle() {
  return {
    flexDirection: "column" as const,
    justifyContent: "center" as const,
    paddingLeft: spacing[12],
    paddingRight: spacing[12],
    flexShrink: 1,
  };
}

/** Shared AppText props: omit numberOfLines so titles wrap fully into dynamic row height. */
export function getSpinListItemTextProps() {
  return {};
}
