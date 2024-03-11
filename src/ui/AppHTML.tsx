import * as React from "react";
import { useTheme } from "../theme/useTheme";
import { fontSize } from "../theme/theme";
import RenderHTML, { RenderHTMLProps } from "react-native-render-html";

export function AppHTML(props: RenderHTMLProps) {
  const theme = useTheme();

  return (
    <RenderHTML
      baseStyle={{
        color: theme.colors.text,
        fontSize: fontSize["md"].size,
        lineHeight: fontSize["md"].lineHeight,
      }}
      {...props}
    />
  );
}
