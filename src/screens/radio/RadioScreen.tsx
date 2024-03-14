import * as React from "react";

import { ScrollView, TouchableOpacity, View } from "react-native";
import { AppIcon } from "../../ui/AppIcon";
import { useRadio } from "./useRadio";
import { useSpins } from "../../api/hooks/useSpins";
import { SpinCitation } from "../spin/SpinCitation";
import { spacing } from "../../theme/theme";
import { SongArt } from "../spin/SongArt";

const POLL_INTERVAL = 10000; // 10 seconds

export function RadioScreen() {
  const { data: qData } = useSpins(
    { count: 1, page: 1 },
    { refetchInterval: POLL_INTERVAL },
  );

  const listdata = (qData?.pages ?? []).map((page) => page.items).flat();
  const song = listdata.length > 0 ? listdata[0] : null;

  const r = useRadio();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          padding: spacing[12],
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <SongArt source={song?.image} />
      </View>

      <View style={{ flexShrink: 1 }}>
        <ScrollView
          style={{
            padding: spacing[12],
          }}
        >
          <SpinCitation id={song?.id ?? 0} />
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            padding: spacing[10],
          }}
        >
          <TouchableOpacity
            style={{ width: "auto" }}
            onPress={() => (r.isPlaying ? r.stop() : r.play())}
            disabled={r.isUnloading || r.isLoading}
          >
            <AppIcon name={r.isPlaying ? "stop" : "play"} size={80} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
