import { ActivityIndicator, ScrollView, View } from "react-native";
import * as React from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { usePersona } from "../api/hooks/usePersona";
import { StyleSheet } from "react-native";
import { useWindowDimensions } from "react-native";
import { StackRoute } from "../nav/types";
import { spacing } from "../theme/theme";
import { Headline } from "../components/Headline";
import { getResourceID } from "../api/util/getResourceID";
import { ShowPreview } from "../components/ShowPreview";
import { AppText } from "../ui/AppText";
import { AppHTML } from "../ui/AppHTML";
import { ListHeader } from "../components/ListHeader";
import { AppLink } from "../ui/AppLink";
import _ from "lodash-es";

export function PersonaView() {
  const route = useRoute<StackRoute<"Persona">>();
  const nav = useNavigation();
  const name = route?.params?.name ?? "";
  const id = route?.params?.id ?? 0;

  React.useEffect(() => {
    if (name) {
      nav.setOptions({ title: route?.params?.name });
    }
  }, [name]);

  const { width } = useWindowDimensions();
  const { isPending, error, data } = usePersona({ id });

  const bio = React.useMemo(() => data?.bio ?? "", [data?.bio]);

  const showIDs = (data?._links?.shows ?? [])
    .map((p) => p.href as string) // typecast because next line has filter
    .filter(Boolean)
    .map(getResourceID)
    .filter(Boolean);

  if (isPending)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );

  if (error)
    return <AppText>{"An error has occurred: " + error.message}</AppText>;

  return (
    <View style={[{ flex: 1 }]}>
      <View style={{ padding: spacing[12] }}>
        <Headline
          title={data.name ?? ""}
          img={{
            source: data.image,
            icon: "person-outline",
          }}
          subtitle={
            <View>
              {data?.since && (
                <AppText
                  size="sm"
                  numberOfLines={1}
                  style={styles.coverAppText}
                >
                  Joined in {data.since}
                </AppText>
              )}
              {data?.email && (
                <AppText numberOfLines={1}>
                  <AppLink size="sm" href={`mailto:${data.email}`}>
                    {data.email}
                  </AppLink>
                </AppText>
              )}
              {data?.website && (
                <AppText numberOfLines={1}>
                  <AppLink size="sm" href={data.website}>
                    {data.website}
                  </AppLink>
                </AppText>
              )}
            </View>
          }
        />
      </View>

      {bio && (
        <ScrollView style={styles.bio}>
          <AppHTML contentWidth={width} source={{ html: bio }} />
        </ScrollView>
      )}
      <>
        {showIDs.length > 0 && (
          <>
            <ListHeader text="Shows" />
            <ScrollView>
              {showIDs.map((id) => (
                <ShowPreview key={id} id={id} />
              ))}
            </ScrollView>
          </>
        )}
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  coverAppText: {
    lineHeight: spacing[20],
  },
  bio: {
    padding: spacing[12],
    maxHeight: 150,
  },
});
