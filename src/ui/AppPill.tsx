import * as React from "react";
import { AppText } from "./AppText";
import { View } from "react-native";
import { useTheme } from "../theme/useTheme";
import { fontSize, spacing } from "../theme/theme";

interface AppPillProps {
  text: string;
}

export function AppPill(props: AppPillProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.border,
        alignSelf: "flex-start",
        borderRadius: 1000, // some large number
        paddingLeft: spacing["12"],
        paddingRight: spacing["12"],
        paddingTop: spacing["2"],
        paddingBottom: spacing["2"],
      }}
    >
      <AppText
        style={{
          fontSize: fontSize["sm"].size,
          lineHeight: fontSize["sm"].lineHeight,
        }}
      >
        {props.text}
      </AppText>
    </View>
  );
}
