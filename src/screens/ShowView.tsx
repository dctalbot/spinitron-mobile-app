import { ActivityIndicator, Button, Text, View } from "react-native";
import * as React from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useShow } from "../api/useShow";

const STUB = "http://x.io";

function ShowView() {
  const route = useRoute();
  const navigation = useNavigation();
  const id = route?.params?.id ?? "";

  const { isPending, error, data } = useShow({ id });

  if (isPending)
    return (
      <View>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );

  if (error) return <Text>{"An error has occurred: " + error.message}</Text>;

  const personaIDs = (data?._links?.personas ?? []).map((p) => {
    const url = new URL(p.href);
    const segments = url.pathname.split("/");
    return segments[segments.length - 1];
  });

  let playlistID = data?._links?.playlists?.href ?? "";
  if (playlistID) {
    const url = new URL(STUB + data?._links?.playlists?.href);
    playlistID = url.searchParams.get("playlist_id") ?? "";
  }

  return (
    <View style={[{ flex: 1 }]}>
      <Text>{data?.id}</Text>
      <Text>{data?.start}</Text>
      <Text>{data?.end}</Text>
      <Text>{data?.duration}</Text>
      <Text>{data?.timezone}</Text>
      <Text>{data?.one_off}</Text>
      <Text>{data?.category}</Text>
      <Text>{data?.title}</Text>
      <Text>{data?.description}</Text>
      <Text>{data?.since}</Text>
      <Text>{data?.url}</Text>
      <Text>{data?.hide_dj}</Text>
      <Text>{data?.image}</Text>

      {personaIDs.map((id, i) => (
        <Button
          key={id}
          title={"Persona " + (i + 1)}
          onPress={() =>
            navigation.push("Persona", {
              id,
            })
          }
        />
      ))}

      <Button
        title={"playlists for this show"}
        onPress={() =>
          navigation.push("Playlists", {
            show_id: id,
          })
        }
      />
    </View>
  );
}

export { ShowView };
