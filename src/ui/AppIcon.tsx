import * as React from "react";
import { Ionicons } from "@expo/vector-icons"; // eslint-disable-line no-restricted-imports
import { ComponentProps } from "react";
import { useTheme } from "../theme/useTheme";

export interface AppIconProps extends ComponentProps<typeof Ionicons> {}

export function AppIcon(props: AppIconProps) {
  const theme = useTheme();
  return <Ionicons color={theme.colors.text} {...props} />;
}
