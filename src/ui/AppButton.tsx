import * as React from "react";
import { useTheme } from "../theme/useTheme";
import { Button, ButtonProps } from "react-native";

type AppButtonProps = ButtonProps;

export function AppButton(props: AppButtonProps) {
  const theme = useTheme();
  return <Button color={theme.colors.primary} {...props} />;
}
