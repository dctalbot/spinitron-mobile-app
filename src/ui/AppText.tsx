import * as React from "react";
import { Text, TextProps } from "react-native"; // eslint-disable-line no-restricted-imports
import { useTheme } from "../theme/useTheme";
import { fontSize } from "../theme/theme";

export function AppText(props: TextProps) {
  const { style: _style, ...rest } = props;
  const theme = useTheme();

  const style: TextProps["style"] = [
    {
      fontSize: fontSize["md"].size,
      lineHeight: fontSize["md"].lineHeight,
      color: theme.colors.text,
    },
    _style,
  ];

  return <Text style={style} {...rest} />;
}
