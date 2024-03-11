import * as React from "react";
import { Text, TextProps } from "react-native"; // eslint-disable-line no-restricted-imports
import { useTheme } from "../theme/useTheme";
import { fontSize } from "../theme/theme";

interface AppTextProps extends TextProps {
  size?: keyof typeof fontSize;
}

export function AppText(props: AppTextProps) {
  const { style: _style, size = "md", ...rest } = props;
  const theme = useTheme();

  const style: TextProps["style"] = [
    {
      fontSize: fontSize[size].size,
      lineHeight: fontSize[size].lineHeight,
      color: theme.colors.text,
    },
    _style,
  ];

  return <Text style={style} {...rest} />;
}
