import * as React from "react";
import { Text, TextProps } from "react-native";
import { useTheme } from "../theme/useTheme";

export function AppText(props: TextProps) {
  const { style: _style, ...rest } = props;
  const theme = useTheme();

  const style = [
    {
      color: theme.colors.text,
    },
    _style,
  ];

  return <Text style={style} {...rest} />;
}
