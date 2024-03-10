import { View } from "react-native";
import * as React from "react";

import { AppScrollView } from "./AppScrollView";
import { LinksList } from "./settings/LinksList";

function SettingsView() {
  return (
    <View style={[{ flex: 1 }]}>
      <AppScrollView>
        <View>
          <LinksList />
        </View>
      </AppScrollView>
    </View>
  );
}

export { SettingsView };
