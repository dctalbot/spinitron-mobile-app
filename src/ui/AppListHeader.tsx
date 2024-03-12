import * as React from "react";
import { AppText } from "./AppText";
import { View } from "react-native";
import { useTheme } from "../theme/useTheme";
import { fontWeight, spacing } from "../theme/theme";

interface AppListHeaderProps {
  text: string;
}

export function AppListHeader(props: AppListHeaderProps) {
  const theme = useTheme();
  return (
    <View
      style={{ backgroundColor: theme.colors.border, padding: spacing["4"] }}
    >
      <AppText style={{ fontWeight: fontWeight["semibold"] }}>
        {props.text}
      </AppText>
    </View>
  );
}
