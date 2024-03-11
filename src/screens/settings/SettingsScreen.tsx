import { ScrollView } from "react-native";
import * as React from "react";

import { LinksList } from "./LinksList";
import { spacing } from "../../theme/theme";

function SettingsScreen() {
  return (
    <ScrollView style={{ flex: 1, padding: spacing[12] }}>
      <LinksList />
    </ScrollView>
  );
}

export { SettingsScreen };
