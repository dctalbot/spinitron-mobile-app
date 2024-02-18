import { View } from "react-native";
import * as React from "react";

import { useRoute } from "@react-navigation/native";
import { SpinsRoute } from "../nav/types";
import { SpinList } from "../SpinList";

function SpinsView() {
  const route = useRoute<SpinsRoute>();

  return (
    <View style={[{ flex: 1 }]}>
      <SpinList useSpinsInput={{ playlist_id: route?.params?.playlist_id }} />
    </View>
  );
}

export { SpinsView };
