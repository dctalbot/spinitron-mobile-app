import { ActivityIndicator, Button, Text, View } from "react-native";
import * as React from "react";

import { API_BASE_URL } from "../config";
import { PlaylistAPI } from "../types/types";
import { useQuery } from "@tanstack/react-query";
import { useNavigation, useRoute } from "@react-navigation/native";

function PlaylistView() {
  const route = useRoute();
  const navigation = useNavigation();
  const id = route?.params?.id ?? "";

  const { isPending, error, data } = useQuery<PlaylistAPI>({
    queryKey: ["playlist", id],
    queryFn: () =>
      fetch(API_BASE_URL + "/playlists/" + id).then((res) => res.json()),
  });

  if (isPending)
    return (
      <View>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );

  if (error) return <Text>{"An error has occurred: " + error.message}</Text>;

  return (
    <View style={[{ flex: 1 }]}>
      <Text>{data?.id}</Text>
      <Text>{data?.persona_id}</Text>
      <Text>{data?.show_id}</Text>
      <Text>{data?.start}</Text>
      <Text>{data?.end}</Text>
      <Text>{data?.duration}</Text>
      <Text>{data?.timezone}</Text>
      <Text>{data?.category}</Text>
      <Text>{data?.title}</Text>
      <Text>{data?.description}</Text>
      <Text>{data?.since}</Text>
      <Text>{data?.url}</Text>
      <Text>{data?.hide_dj}</Text>
      <Text>{data?.image}</Text>
      <Text>{data?.automation}</Text>
      <Text>{data?.episode_name}</Text>
      <Text>{data?.episode_description}</Text>
      <Text>{data?.spinsCount}</Text>
      {data?.persona_id && (
        <Button
          title="Persona"
          onPress={() =>
            navigation.push("Persona", {
              id: data.persona_id,
            })
          }
        ></Button>
      )}
      {data?.show_id && (
        <Button
          title="Show"
          onPress={() =>
            navigation.push("Show", {
              id: data.show_id,
            })
          }
        ></Button>
      )}
      <Button
        title="Spins"
        onPress={() =>
          navigation.push("Spins", {
            playlist_id: id,
          })
        }
      ></Button>
    </View>
  );
}

export { PlaylistView };
