import { ActivityIndicator, Button, Text, View } from "react-native";
import * as React from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useSpin } from "../api/useSpin";

function SpinView() {
  const route = useRoute();
  const navigation = useNavigation();
  const id = route?.params?.id ?? "";

  const { isPending, error, data } = useSpin({ id });

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
      <Text>{data?.playlist_id}</Text>
      <Text>{data?.start}</Text>
      <Text>{data?.end}</Text>
      <Text>{data?.duration}</Text>
      <Text>{data?.timezone}</Text>
      <Text>{data?.image}</Text>
      <Text>{data?.classical}</Text>
      <Text>{data?.artist}</Text>
      <Text>{data?.["artist-custom"]}</Text>
      <Text>{data?.composer}</Text>
      <Text>{data?.release}</Text>
      <Text>{data?.["release-custom"]}</Text>
      <Text>{data?.released}</Text>
      <Text>{data?.medium}</Text>
      <Text>{data?.va}</Text>
      <Text>{data?.label}</Text>
      <Text>{data?.["label-custom"]}</Text>
      <Text>{data?.song}</Text>
      <Text>{data?.note}</Text>
      <Text>{data?.request}</Text>
      <Text>{data?.local}</Text>
      <Text>{data?.new}</Text>
      <Text>{data?.genre}</Text>
      <Text>{data?.work}</Text>
      <Text>{data?.conductor}</Text>
      <Text>{data?.performers}</Text>
      <Text>{data?.ensemble}</Text>
      <Text>{data?.["catalog-number"]}</Text>
      <Text>{data?.isrc}</Text>
      <Text>{data?.upc}</Text>
      <Text>{data?.iswc}</Text>
      <Button
        title="Playlist"
        onPress={() => navigation.push("Playlist", { id: data?.playlist_id })}
      ></Button>
    </View>
  );
}

export { SpinView };
