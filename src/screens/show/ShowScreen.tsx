import { ActivityIndicator, ScrollView, View } from "react-native";
import * as React from "react";

import { useRoute } from "@react-navigation/native";
import { useShow } from "@dctalbot/react-spinitron";
import { StackRoute } from "../../nav/types";
import { getResourceID } from "@dctalbot/react-spinitron";
import { PersonaPreview } from "./PersonaPreview";
import { PlaylistList } from "./PlaylistList";
import { AppText } from "../../ui/AppText";
import { fontSize, fontWeight, spacing } from "../../theme/theme";
import { useContentWidth } from "react-native-render-html";
import { AppHTML } from "../../ui/AppHTML";
import { AppListHeader } from "../../ui/AppListHeader";
import { AppPill } from "../../ui/AppPill";
import { MAX_COUNT } from "@dctalbot/react-spinitron";
import { AppLink } from "../../ui/AppLink";

function ShowScreen() {
  const route = useRoute<StackRoute<"Show">>();
  const id = route?.params?.id ?? 0;
  const width = useContentWidth();

  const { isPending, error, data } = useShow({ id });

  const cat = React.useMemo(
    () => (data?.category ?? "").trim(),
    [data?.category],
  );

  const desc = React.useMemo(
    () => (data?.description ?? "").trim(),
    [data?.description],
  );

  if (isPending)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );

  if (error)
    return <AppText>{"An error has occurred: " + error.message}</AppText>;

  const personaIDs: number[] = (data?._links?.personas ?? [])
    .map((p) => p.href as string) // typecast because the filters handle empty values
    .map(getResourceID)
    .filter(Boolean);

  return (
    <View style={[{ flex: 1 }]}>
      <View style={{ padding: spacing["12"] }}>
        <View style={{ flexDirection: "row", columnGap: spacing[12] }}>
          <View>
            <AppText
              style={{
                fontSize: fontSize["2xl"].size,
                lineHeight: fontSize["2xl"].lineHeight,
                fontWeight: fontWeight.semibold,
              }}
            >
              {data.title ?? ""}
            </AppText>
            <View>
              {cat && (
                <View style={{ marginTop: spacing[6] }}>
                  <AppPill text={cat} />
                </View>
              )}
              {data?.url && (
                <View style={{ marginTop: spacing[12] }}>
                  <AppLink href={data?.url}>{data?.url}</AppLink>
                </View>
              )}

              {desc && (
                <ScrollView style={{ maxHeight: 160, marginTop: spacing[12] }}>
                  <AppHTML contentWidth={width} source={{ html: desc }} />
                </ScrollView>
              )}
            </View>
          </View>
        </View>
      </View>

      {personaIDs.length > 0 && (
        <>
          <AppListHeader text="Hosts" />
          {personaIDs.map((id) => (
            <PersonaPreview key={id} id={id} />
          ))}
        </>
      )}

      <AppListHeader text="Episodes" />
      <PlaylistList queryInput={{ show_id: id, count: MAX_COUNT }} />
    </View>
  );
}

export { ShowScreen };
