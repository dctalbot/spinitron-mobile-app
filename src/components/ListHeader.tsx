import * as React from "react";
import { AppText } from "../ui/AppText";
import { View } from "react-native";
import { useTheme } from "../theme/useTheme";
import { fontWeight, spacing } from "../theme/theme";

interface ListHeaderProps {
  text: string;
}

export function ListHeader(props: ListHeaderProps) {
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
