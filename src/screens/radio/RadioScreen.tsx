import * as React from "react";

import {
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import { AppTouchableOpacity } from "../../ui/AppTouchableOpacity";
import { AppIcon } from "../../ui/AppIcon";
import { useRadio } from "./useRadio";
import { useSpins } from "@dctalbot/react-spinitron";
import { SpinCitation } from "../spin/SpinCitation";
import { spacing } from "../../theme/theme";
import { SongArt } from "../spin/SongArt";
import { PersonaLink } from "../playlist/PersonaLink";
import { usePlaylist } from "@dctalbot/react-spinitron";
import { ShowLink } from "../playlist/ShowLink";
import { useTheme } from "../../theme/useTheme";

const POLL_INTERVAL = 10000; // 10 seconds
const PLAY_SIZE = 60;

export function RadioScreen() {
  const theme = useTheme();
  const windowHeight = useWindowDimensions().height;
  const { data: qData } = useSpins(
    { count: 1, page: 1 },
    { refetchInterval: POLL_INTERVAL },
  );

  const listdata = qData ?? [];
  const song = listdata.length > 0 ? listdata[0] : null;

  const { data: playlistData } = usePlaylist(
    { id: song?.playlist_id ?? 0 },
    { enabled: Boolean(song?.playlist_id) },
  );

  const r = useRadio();

  const playPause = (
    <AppTouchableOpacity
      style={{ width: "auto" }}
      onPress={() => (r.ui === "stop" ? r.stop() : r.play())}
      disabled={r.ui === "spin"}
    >
      <AppIcon
        name={r.ui === "stop" ? "stop" : "play"}
        size={PLAY_SIZE}
        color={theme.colors.primary}
      />
    </AppTouchableOpacity>
  );

  const loader = (
    <ActivityIndicator size="large" style={{ height: PLAY_SIZE }} />
  );

  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: spacing[12],
      }}
    >
      <View
        style={{
          flexShrink: 1,
          flexGrow: 0,
        }}
      >
        <ShowLink id={playlistData?.show_id ?? 0} />
        <PersonaLink id={playlistData?.persona_id ?? 0} />
      </View>

      <View
        style={{
          flexGrow: 1,
          flexShrink: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          paddingTop: spacing[6],
          paddingBottom: spacing[6],
          maxHeight: windowHeight / 2,
        }}
      >
        <SongArt source={song?.image} />
      </View>

      <View
        style={{
          flexGrow: 1,
          minHeight: 80,
          maxHeight: windowHeight / 5,
          paddingTop: spacing[6],
          paddingBottom: spacing[6],
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ScrollView>
          <SpinCitation id={song?.id ?? 0} />
        </ScrollView>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {r.ui === "spin" ? loader : playPause}
      </View>
    </View>
  );
}
