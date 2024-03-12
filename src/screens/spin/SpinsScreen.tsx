import { View } from "react-native";
import * as React from "react";

import { useRoute } from "@react-navigation/native";
import { StackRoute } from "../../nav/types";
import { SpinList } from "./SpinList";
import { MAX_COUNT } from "../../api/util/constants";

function SpinsScreen() {
  const route = useRoute<StackRoute<"Spins">>();

  return (
    <View style={[{ flex: 1 }]}>
      <SpinList
        useSpinsInput={{
          playlist_id: route?.params?.playlist_id,
          count: MAX_COUNT,
        }}
      />
    </View>
  );
}

export { SpinsScreen };
