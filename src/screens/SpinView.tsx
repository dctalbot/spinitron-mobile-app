import { ActivityIndicator, ScrollView, View } from "react-native";
import * as React from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useSpin } from "../api/useSpin";
import { StackNav, StackRoute } from "../nav/types";
import { spacing } from "../theme/theme";

import { useWindowDimensions } from "react-native";
import { SpinCitation } from "../components/SpinCitation";
import { AppText } from "../ui/AppText";
import { AppButton } from "../ui/AppButton";
import { AppImage, AppImageProps } from "../ui/AppImage";

export function SongArt(props: Partial<AppImageProps>) {
  const { width: _width } = useWindowDimensions();
  const width = (_width * 2) / 3;

  return (
    <AppImage
      alt="Song cover art"
      style={{
        width: "100%",
        aspectRatio: 1,
      }}
      source={props.source}
      icon="disc-outline"
      size={width}
    />
  );
}

function SpinView() {
  const nav = useNavigation<StackNav>();
  const route = useRoute<StackRoute<"Spin">>();
  const id: number = route?.params?.id ?? 0;
  const song: string = route?.params?.song ?? "";

  React.useEffect(() => {
    if (song) {
      nav.setOptions({ title: song });
    }
  }, [song]);

  const { isPending, error, data } = useSpin({ id });

  const playlist_id: number = data?.playlist_id ?? 0;

  if (isPending)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );

  if (error)
    return <AppText>{"An error has occurred: " + error.message}</AppText>;

  return (
    <ScrollView style={{ padding: spacing[12], flex: 1 }}>
      <View style={{ gap: spacing[12], flex: 1 }}>
        {data?.image && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <SongArt source={data?.image} />
          </View>
        )}

        <SpinCitation id={id} />

        {playlist_id && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingBottom: spacing[40],
              marginBottom: spacing[12],
            }}
          >
            <AppButton
              title="See Playlist →"
              onPress={() => nav.push("Playlist", { id: playlist_id })}
              accessibilityLabel="View full Playlist"
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export { SpinView };
