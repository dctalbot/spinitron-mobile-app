import { ActivityIndicator, Text, View } from "react-native";
import * as React from "react";

import { useRoute } from "@react-navigation/native";
import { usePlaylist } from "../api/usePlaylist";
import { StackRoute } from "../nav/types";
import { SpinList } from "../components/SpinList";
import { ShowPreview } from "../components/ShowPreview";
import { PersonaPreview } from "../components/PersonaPreview";
import { formatTime } from "../util/time";
import { Headline } from "../components/Headline";
import { spacing } from "../theme/theme";

function PlaylistView() {
  const route = useRoute<StackRoute<"Playlist">>();
  const id = route?.params?.id ?? 0;

  const { isPending, error, data } = usePlaylist({ id });

  const show_id = data?.show_id ?? 0;
  const persona_id = data?.persona_id ?? 0;

  if (isPending)
    return (
      <View>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );

  if (error) return <Text>{"An error has occurred: " + error.message}</Text>;

  return (
    <View style={[{ flex: 1 }]}>
      <View style={{ padding: spacing[12], rowGap: spacing[4] }}>
        {show_id && (
          <>
            <ShowPreview id={show_id} />
          </>
        )}

        {persona_id && (
          <>
            <Headline title="Host:" />
            <PersonaPreview id={persona_id} />
          </>
        )}

        {data?.start && (
          <>
            <Text>{formatTime(data?.start)}</Text>
          </>
        )}
      </View>

      {/* {data.episode_description && (
        <RenderHtml
          contentWidth={width}
          source={{ html: data.episode_description }}
        />
      )} */}
      <SpinList useSpinsInput={{ playlist_id: id }} />
    </View>
  );
}

export { PlaylistView };
