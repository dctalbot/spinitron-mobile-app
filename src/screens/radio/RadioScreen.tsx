import * as React from "react";

import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { AppIcon } from "../../ui/AppIcon";
import { useRadio } from "./useRadio";
import { useSpins } from "../../api/hooks/useSpins";
import { SpinCitation } from "../spin/SpinCitation";
import { spacing } from "../../theme/theme";
import { SongArt } from "../spin/SongArt";
import { PersonaLink } from "../playlist/PersonaLink";
import { usePlaylist } from "../../api/hooks/usePlaylist";
import { ShowLink } from "../playlist/ShowLink";

const POLL_INTERVAL = 10000; // 10 seconds
const PLAY_SIZE = 60;

export function RadioScreen() {
  const { data: qData } = useSpins(
    { count: 1, page: 1 },
    { refetchInterval: POLL_INTERVAL },
  );

  const listdata = (qData?.pages ?? []).map((page) => page.items).flat();
  const song = listdata.length > 0 ? listdata[0] : null;

  const { data: playlistData } = usePlaylist(
    { id: song?.playlist_id ?? 0 },
    { enabled: Boolean(song?.playlist_id) },
  );

  const r = useRadio();

  const disabled = r.isUnloading || r.isLoading;

  const playPause = (
    <TouchableOpacity
      style={{ width: "auto" }}
      onPress={() => (r.isPlaying ? r.stop() : r.play())}
      disabled={r.isUnloading || r.isLoading}
    >
      <AppIcon name={r.isPlaying ? "stop" : "play"} size={PLAY_SIZE} />
    </TouchableOpacity>
  );

  const loader = (
    <ActivityIndicator size="large" style={{ height: PLAY_SIZE }} />
  );

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        padding: spacing[12],
      }}
    >
      <View style={{ rowGap: spacing[12] }}>
        <View>
          <ShowLink id={playlistData?.show_id ?? 0} />
          <PersonaLink id={playlistData?.persona_id ?? 0} />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <SongArt source={song?.image} />
        </View>
      </View>

      <View style={{ flexShrink: 1 }}>
        <ScrollView
          style={{
            marginVertical: spacing[12],
          }}
        >
          <SpinCitation id={song?.id ?? 0} />
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {disabled ? loader : playPause}
        </View>
      </View>
    </View>
  );
}
