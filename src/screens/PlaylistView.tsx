import {
  ActivityIndicator,
  Button,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import * as React from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { usePlaylist } from "../api/usePlaylist";
import { PlaylistNav, PlaylistRoute } from "../nav/types";
import RenderHtml from "react-native-render-html";
import { SpinList } from "../SpinList";

function PlaylistView() {
  const nav = useNavigation<PlaylistNav>();
  const route = useRoute<PlaylistRoute>();
  const { width } = useWindowDimensions();
  const id = route?.params?.id ?? 0;

  const { isPending, error, data } = usePlaylist({ id });

  React.useEffect(() => {
    if (data?.title) {
      nav.setOptions({ title: data?.title });
    }
  }, [data]);

  if (isPending)
    return (
      <View>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );

  if (error) return <Text>{"An error has occurred: " + error.message}</Text>;

  return (
    <View style={[{ flex: 1 }]}>
      <ScrollView>
        {/* <Text>{data?.hide_dj}</Text> */}
        {/* <Text>{data?.persona_id}</Text> */}
        {/* <Text>{data?.show_id}</Text> */}

        <Text>{data?.start}</Text>
        <Text>{data?.timezone}</Text>

        {/* <Text>{data?.end}</Text> */}
        {/* <Text>{data?.category}</Text> */}
        {/* <Text>{data?.title}</Text> */}
        {/* <Text>{data?.description}</Text> */}
        {/* <Text>{data?.since}</Text> */}
        {/* <Text>{data?.url}</Text> */}

        {/* <Text>{data?.image}</Text> */}
        {/* <Text>{data?.automation}</Text> */}

        {data.episode_description && (
          <RenderHtml
            contentWidth={width}
            source={{ html: data.episode_description }}
          />
        )}

        {data?.persona_id && (
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Button
              title="See DJ →"
              onPress={() => nav.push("Persona", { id: data.persona_id })}
            ></Button>
          </View>
        )}

        <SpinList useSpinsInput={{ playlist_id: id }} />

        {data?.show_id && (
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Button
              title="See Show →"
              onPress={() => nav.push("Show", { id: data.show_id })}
            ></Button>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export { PlaylistView };
