import { ActivityIndicator, Button, Text, View } from "react-native";
import * as React from "react";

import { API_BASE_URL } from "../config";
import { ShowAPI } from "../types/types";
import { useQuery } from "@tanstack/react-query";
import { useNavigation, useRoute } from "@react-navigation/native";

function ShowView() {
  const route = useRoute();
  const navigation = useNavigation();
  const id = route?.params?.id ?? "";

  const { isPending, error, data } = useQuery<ShowAPI>({
    queryKey: ["show", id],
    queryFn: () =>
      fetch(API_BASE_URL + "/shows/" + id).then((res) => res.json()),
  });

  if (isPending)
    return (
      <View>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );

  if (error) return <Text>{"An error has occurred: " + error.message}</Text>;

  let personaIDs = (data?._links?.personas ?? []).map((p) => {
    const url = new URL(p.href);
    const segments = url.pathname.split("/");
    return segments[segments.length - 1];
  });

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
          title={"Persona " + (i + 1)}
          onPress={() =>
            navigation.navigate("Persona", {
              id,
            })
          }
        />
      ))}
      <Text>playlists info ...</Text>
    </View>
  );
}

export { ShowView };
