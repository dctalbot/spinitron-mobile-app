import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import * as React from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { usePersona } from "../api/usePersona";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { A } from "@expo/html-elements";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { PersonaRoute } from "../nav/types";
import { spacing } from "../theme/theme";

const AVATAR_SIZE = 80;

function PersonaView() {
  const route = useRoute<PersonaRoute>();
  const nav = useNavigation();
  const name = route?.params?.name ?? "";
  if (name) {
    nav.setOptions({ title: route?.params?.name });
  }
  const id = route?.params?.id ?? 0;
  const { width } = useWindowDimensions();
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
      <ScrollView>
        <View style={styles.cover}>
          {data?.image ? (
            <Image
              alt="DJ Profile Picture"
              style={styles.coverImage}
              source={data.image}
              // placeholder={{ uri: "https://via.placeholder.com/AVATAR_SIZE" }}
              contentFit="cover"
              transition={500}
            />
          ) : (
            <Ionicons name={"person-outline"} size={AVATAR_SIZE} />
          )}
          <View style={styles.coverContact}>
            <Text style={styles.coverName} numberOfLines={1}>
              {data?.name}
            </Text>
            {data?.since && (
              <Text numberOfLines={1} style={styles.coverText}>
                Joined in {data.since}
              </Text>
            )}
            {data?.email && (
              <A href={`mailto:${data.email}`} style={styles.coverText}>
                {data.email}
              </A>
            )}
            {data?.website && (
              <A href={data.website} style={styles.coverText}>
                {data.website}
              </A>
            )}
          </View>
        </View>

        {/* <Text>shows info ...</Text> */}
        {data.bio && (
          <View style={styles.bio}>
            <RenderHtml contentWidth={width} source={{ html: data.bio }} />
          </View>
        )}
      </ScrollView>
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
  coverImage: {
    width: AVATAR_SIZE,
    aspectRatio: 1,
    backgroundColor: "#0553",
    borderRadius: spacing[10],
    flex: 1,
  },
  cover: {
    flexDirection: "row",
    padding: spacing[12],
  },
  coverContact: {
    flexDirection: "column",
    paddingLeft: spacing[10],
    flex: 3.5,
  },
  coverText: {
    lineHeight: spacing[20],
  },
  coverName: {
    fontSize: spacing[20],
  },
  bio: {
    padding: spacing[12],
  },
});
