import * as React from "react";
import { View, ViewProps } from "react-native";
import { spacing } from "../theme/theme";

export function AppScreen(props: ViewProps) {
  return <View style={{ padding: spacing["12"], flex: 1 }} {...props} />;
}
