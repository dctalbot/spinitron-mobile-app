import { View } from "react-native";
import * as React from "react";

import { useRoute } from "@react-navigation/native";
import { StackRoute } from "../nav/types";
import { SpinList } from "../components/SpinList";

function SpinsView() {
  const route = useRoute<StackRoute<"Spins">>();

  return (
    <View style={[{ flex: 1 }]}>
      <SpinList useSpinsInput={{ playlist_id: route?.params?.playlist_id }} />
    </View>
  );
}

export { SpinsView };
