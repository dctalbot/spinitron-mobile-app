import { ActivityIndicator, Text, View } from "react-native";
import * as React from "react";

import { useRoute } from "@react-navigation/native";
import { usePersona } from "./api/usePersona";

function PersonaView() {
  const route = useRoute();
  const id = route?.params?.id ?? "";

  const { isPending, error, data } = usePersona(id);

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
