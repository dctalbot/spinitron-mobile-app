import * as React from "react";
import { View } from "react-native";
import { useTheme } from "../theme/useTheme";

export function AppSeparator() {
  const theme = useTheme();

  const style = [
    {
      height: 1,
      color: theme.colors.text,
      backgroundColor: theme.colors.text,
    },
  ];

  return <View style={style} />;
}
