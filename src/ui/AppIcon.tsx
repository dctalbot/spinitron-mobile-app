import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { useTheme } from "../theme/useTheme";

export type AppIconProps = ComponentProps<typeof Ionicons>;

export function AppIcon(props: AppIconProps) {
  const theme = useTheme();
  return <Ionicons color={theme.colors.text} {...props} />;
}
