import { View } from "react-native";
import * as React from "react";

import { LinksList } from "./LinksList";
import { spacing } from "../../theme/theme";
import { StreamPicker } from "./StreamPicker";

function SettingsScreen() {
  return (
    <View style={{ flex: 1, padding: spacing[12] }}>
      <StreamPicker />
      <LinksList />
    </View>
  );
}

export { SettingsScreen };
