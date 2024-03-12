import { ActivityIndicator, View } from "react-native";
import * as React from "react";

import { useRoute } from "@react-navigation/native";
import { usePlaylist } from "../../api/hooks/usePlaylist";
import { StackRoute } from "../../nav/types";
import { SpinList } from "../../components/SpinList";
import { fmtOnAt } from "../../util/time";
import { spacing } from "../../theme/theme";
import { AppText } from "../../ui/AppText";
import { PersonaLink } from "./PersonaLink";
import { ShowLink } from "./ShowLink";
import { MAX_COUNT } from "../../api/util/constants";

function PlaylistView() {
  const route = useRoute<StackRoute<"Playlist">>();
  const id: number = route?.params?.id ?? 0;

  const { isPending, error, data: playlistData } = usePlaylist({ id });

  const show_id: number = playlistData?.show_id ?? 0;
  const persona_id: number = playlistData?.persona_id ?? 0;

  const at = fmtOnAt(playlistData?.start);

  if (isPending) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return <AppText>{"An error has occurred: " + error.message}</AppText>;
  }

  return (
    <View style={[{ flex: 1 }]}>
      <View style={{ padding: spacing[12] }}>
        <ShowLink id={show_id} />
        <PersonaLink id={persona_id} />
        {at && <AppText>{at}</AppText>}
      </View>

      <SpinList useSpinsInput={{ playlist_id: id, count: MAX_COUNT }} />
    </View>
  );
}

export { PlaylistView };
