import {
  ActivityIndicator,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import * as React from "react";

import { useRoute } from "@react-navigation/native";
import { usePlaylist } from "../api/usePlaylist";
import { PlaylistRoute } from "../nav/types";
import RenderHtml from "react-native-render-html";
import { SpinList } from "../components/SpinList";
import { ShowPreview } from "../components/ShowPreview";
import { PersonaPreview } from "../components/PersonaPreview";

function PlaylistView() {
  const route = useRoute<PlaylistRoute>();
  const { width } = useWindowDimensions();
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
      {/* <Text>{data?.hide_dj}</Text> */}
      {/* <Text>{data?.persona_id}</Text> */}
      {/* <Text>{data?.show_id}</Text> */}

      <Text>Aired on:</Text>
      {show_id && <ShowPreview id={show_id} />}
      <Text>Hosted by:</Text>
      {persona_id && <PersonaPreview id={persona_id} />}
      <Text>
        On: {data?.start} {data?.timezone}
      </Text>

      {/* <Text>{data?.title}</Text> */}
      {/* <Text>{data?.description}</Text> */}
      {/* <Text>{data?.url}</Text> */}

      {/* <Text>{data?.image}</Text> */}

      {data.episode_description && (
        <RenderHtml
          contentWidth={width}
          source={{ html: data.episode_description }}
        />
      )}
      <SpinList useSpinsInput={{ playlist_id: id }} />
    </View>
  );
}

export { PlaylistView };
