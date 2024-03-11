import { ActivityIndicator, View } from "react-native";
import * as React from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { usePersona } from "../api/usePersona";
import { StyleSheet } from "react-native";
import { A } from "@expo/html-elements";
import { useWindowDimensions } from "react-native";
import { StackRoute } from "../nav/types";
import { spacing } from "../theme/theme";
import { Headline } from "../components/Headline";
import { getResourceID } from "../api/getResourceID";
import { ShowPreview } from "../components/ShowPreview";
import { AppScrollView } from "./AppScrollView";
import { AppText } from "../ui/AppText";
import { AppHTML } from "../ui/AppHTML";

export function PersonaView() {
  const route = useRoute<StackRoute<"Persona">>();
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

  const showIDs = (data?._links?.shows ?? [])
    .map((p) => p.href as string) // typecast because next line has filter
    .filter(Boolean)
    .map(getResourceID);

  if (isPending)
    return (
      <View>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );

  if (error)
    return <AppText>{"An error has occurred: " + error.message}</AppText>;

  return (
    <View style={[{ flex: 1 }]}>
      <AppScrollView>
        <Headline
          title={data.name ?? ""}
          img={{
            source: data.image,
            else: "person-outline",
          }}
          subtitle={
            <View>
              {data?.since && (
                <AppText numberOfLines={1} style={styles.coverAppText}>
                  Joined in {data.since}
                </AppText>
              )}
              {data?.email && (
                <A href={`mailto:${data.email}`} style={styles.coverAppText}>
                  {data.email}
                </A>
              )}
              {data?.website && (
                <A href={data.website} style={styles.coverAppText}>
                  {data.website}
                </A>
              )}
            </View>
          }
        />

        {data.bio && (
          <View style={styles.bio}>
            <AppHTML contentWidth={width} source={{ html: data.bio }} />
          </View>
        )}
        <>
          {showIDs.map((id) => (
            <ShowPreview key={id} id={id} />
          ))}
        </>
      </AppScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  coverAppText: {
    lineHeight: spacing[20],
  },
  bio: {},
});
