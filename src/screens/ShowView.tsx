import { ActivityIndicator, ScrollView, View } from "react-native";
import * as React from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useShow } from "../api/hooks/useShow";
import { StackNav, StackRoute } from "../nav/types";
import { getResourceID } from "../api/util/getResourceID";
import { PersonaPreview } from "../components/PersonaPreview";
import { PlaylistList } from "../components/PlaylistList";
import { AppText } from "../ui/AppText";
import { fontSize, fontWeight, spacing } from "../theme/theme";
import { useContentWidth } from "react-native-render-html";
import { AppHTML } from "../ui/AppHTML";
import { ListHeader } from "../components/ListHeader";
import { AppPill } from "../ui/AppPill";
import { MAX_COUNT } from "../api/util/constants";

function ShowView() {
  const nav = useNavigation<StackNav>();
  const route = useRoute<StackRoute<"Show">>();
  const id = route?.params?.id ?? 0;
  const title = route?.params?.title ?? "";
  const width = useContentWidth();

  const { isPending, error, data } = useShow({ id });

  const cat = React.useMemo(
    () => (data?.category ?? "").trim(),
    [data?.category]
  );

  const desc = React.useMemo(
    () => (data?.description ?? "").trim(),
    [data?.description]
  );

  React.useEffect(() => {
    if (title) {
      nav.setOptions({ title });
    }
  }, [title]);

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
                <View style={{ marginTop: spacing["6"] }}>
                  <AppPill text={cat} />
                </View>
              )}

              {desc && (
                <ScrollView
                  style={{ maxHeight: 160, marginTop: spacing["12"] }}
                >
                  <AppHTML contentWidth={width} source={{ html: desc }} />
                </ScrollView>
              )}

              <AppText>{data?.url}</AppText>
            </View>
          </View>
        </View>
      </View>

      {personaIDs.length > 0 && (
        <>
          <ListHeader text="Hosts" />
          {personaIDs.map((id) => (
            <PersonaPreview key={id} id={id} />
          ))}
        </>
      )}

      <ListHeader text="Episodes" />
      <PlaylistList queryInput={{ show_id: id, count: MAX_COUNT }} />
    </View>
  );
}

export { ShowView };
