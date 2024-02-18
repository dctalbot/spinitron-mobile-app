import { ActivityIndicator, Text, View } from "react-native";
import * as React from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { usePersona } from "../api/usePersona";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { A } from "@expo/html-elements";

const AVATAR_SIZE = 80;

function PersonaView() {
  const route = useRoute();
  const nav = useNavigation();
  const name = route?.params?.name ?? "";
  if (name) {
    nav.setOptions({ title: route?.params?.name });
  }
  const id = route?.params?.id ?? "";

  const { isPending, error, data } = usePersona({ id });

  if (isPending)
    return (
      <View>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );

  if (error) return <Text>{"An error has occurred: " + error.message}</Text>;

  return (
    <View style={[{ flex: 1 }]}>
      <Text>{data?.name}</Text>
      <Text>{data?.bio}</Text>
      {data?.since && <Text>Joined {data.since}</Text>}
      {data?.email && <A href={`mailto:${data.email}`}>{data.email}</A>}
      {data?.website && <A href={`mailto:${data.website}`}>{data.website}</A>}
      {data?.image ? (
        <Image
          alt="DJ Profile Picture"
          style={styles.image}
          source={data.image}
          // placeholder={{ uri: "https://via.placeholder.com/AVATAR_SIZE" }}
          contentFit="cover"
          transition={500}
        />
      ) : (
        <Ionicons name={"person-outline"} size={AVATAR_SIZE} />
      )}
      <Text>shows info ...</Text>
    </View>
  );
}

export { PersonaView };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: AVATAR_SIZE,
    aspectRatio: 1,
    backgroundColor: "#0553",
    borderRadius: 4,
  },
});
