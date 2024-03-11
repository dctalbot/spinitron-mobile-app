import { ActivityIndicator, Button, View } from "react-native";
import * as React from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useSpin } from "../api/useSpin";
import { StackNav, StackRoute } from "../nav/types";
import { spacing } from "../theme/theme";

import { Image, ImageProps } from "expo-image";
import { useWindowDimensions } from "react-native";
import { SpinCitation } from "../components/SpinCitation";
import { AppScrollView } from "./AppScrollView";
import { AppIcon } from "../ui/AppIcon";
import { AppText } from "../ui/AppText";

interface SongArtProps extends ImageProps {}

export function SongArt(props: SongArtProps) {
  const { width: _width } = useWindowDimensions();
  const width = (_width * 2) / 3;
  if (!props.source) {
    return <AppIcon name={"disc-outline"} size={width} />;
  }
  return (
    <Image
      alt="Song cover art"
      style={{
        width: "100%",
        aspectRatio: 1,
      }}
      source={props.source}
      contentFit="cover"
      transition={500}
    />
  );
}

function SpinView() {
  const nav = useNavigation<StackNav>();
  const route = useRoute<StackRoute<"Spin">>();
  const id = route?.params?.id ?? 0;
  const song = route?.params?.song ?? "";

  React.useEffect(() => {
    if (song) {
      nav.setOptions({ title: song });
    }
  }, [song]);

  const { isPending, error, data } = useSpin({ id });

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
        <View style={{ gap: spacing[12] }}>
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

          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Button
              title="See Playlist →"
              onPress={() => nav.push("Playlist", { id: data?.playlist_id })}
            ></Button>
          </View>
        </View>
      </AppScrollView>
    </View>
  );
}

export { SpinView };
