import * as React from "react";

import {
  ScrollView,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { AppIcon } from "../../ui/AppIcon";
import { useRadio } from "./useRadio";
import { useSpins } from "../../api/hooks/useSpins";
import { SpinCitation } from "../spin/SpinCitation";
import { AppImage, AppImageProps } from "../../ui/AppImage";
import { spacing } from "../../theme/theme";

const POLL_INTERVAL = 10000; // 10 seconds

export function SongArt(props: Partial<AppImageProps>) {
  const { width: _width } = useWindowDimensions();
  const width = _width / 2;

  return (
    <AppImage
      alt="Song cover art"
      style={{
        width: "100%",
        aspectRatio: 1,
      }}
      source={props.source}
      icon="disc-outline"
      size={width}
    />
  );
}

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
        justifyContent: "flex-end",
      }}
    >
      <View
        style={{
          padding: spacing[12],
        }}
      >
        <SongArt source={song?.image} />
      </View>
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
  );
}
