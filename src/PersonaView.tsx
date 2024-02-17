import { ActivityIndicator, Button, Text, View } from "react-native";
import * as React from "react";

import { API_BASE_URL } from "../config";
import { PersonaAPI } from "../types/types";
import { useQuery } from "@tanstack/react-query";
import { useNavigation, useRoute } from "@react-navigation/native";

function PersonaView() {
  const route = useRoute();
  const navigation = useNavigation();
  const id = route?.params?.id ?? "";

  const { isPending, error, data } = useQuery<PersonaAPI>({
    queryKey: ["persona", id],
    queryFn: () =>
      fetch(API_BASE_URL + "/personas/" + id).then((res) => res.json()),
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
      <Text>{data?.name}</Text>
      <Text>{data?.bio}</Text>
      <Text>{data?.since}</Text>
      <Text>{data?.email}</Text>
      <Text>{data?.website}</Text>
      <Text>{data?.image}</Text>

      <Text>shows info ...</Text>
    </View>
  );
}

export { PersonaView };
