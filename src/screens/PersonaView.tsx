import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import * as React from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { usePersona } from "../api/usePersona";
import { StyleSheet } from "react-native";
import { A } from "@expo/html-elements";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { PersonaRoute } from "../nav/types";
import { spacing } from "../theme/theme";
import { Avatar } from "../components/Avatar";

const AVATAR_SIZE = 80;

export function PersonaView() {
  const route = useRoute<PersonaRoute>();
  const nav = useNavigation();
  const name = route?.params?.name ?? "";

  React.useEffect(() => {
    if (name) {
      nav.setOptions({ title: route?.params?.name });
    }
  }, [name]);

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
          <Avatar size={AVATAR_SIZE} source={data?.image} />

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

        {/* <Text>{data._links?.shows}</Text> */}
        {data.bio && (
          <View style={styles.bio}>
            <RenderHtml contentWidth={width} source={{ html: data.bio }} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
