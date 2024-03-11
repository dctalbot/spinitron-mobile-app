import * as React from "react";
import { useTheme } from "../theme/useTheme";
import { A } from "@expo/html-elements"; // eslint-disable-line no-restricted-imports
import { LinkProps } from "@expo/html-elements/build/elements/Text.types";
import { AppText } from "./AppText";
import { fontSize } from "../theme/theme";

interface AppLinkProps extends LinkProps {
  size?: keyof typeof fontSize;
}

export function AppLink(props: AppLinkProps) {
  const { size = "md", ...rest } = props;
  const theme = useTheme();

  return (
    <AppText size={size}>
      <A style={{ color: theme.colors.primary }} {...rest} />
    </AppText>
  );
}
