import {
  ActivityIndicator,
  Button,
  ScrollView,
  Text,
  View,
} from "react-native";
import * as React from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useSpin } from "../api/useSpin";
import { SpinNav, SpinRoute } from "../nav/types";
import { spacing } from "../theme/theme";

import { Image, ImageProps } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useWindowDimensions } from "react-native";
import { SpinCitation } from "../components/SpinCitation";

interface SongArtProps extends ImageProps {}

export function SongArt(props: SongArtProps) {
  const { width: _width } = useWindowDimensions();
  const width = (_width * 2) / 3;
  if (!props.source) {
    return <Ionicons name={"disc-outline"} size={width} />;
  }
  return (
    <Image
      alt="Song cover art"
      style={{
        width: "100%",
        aspectRatio: 1,
      }}
      source={props.source}
      // placeholder={{ uri: "https://via.placeholder.com/AVATAR_SIZE" }}
      contentFit="cover"
      transition={500}
    />
  );
}

function SpinView() {
  const nav = useNavigation<SpinNav>();
  const route = useRoute<SpinRoute>();
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

  if (error) return <Text>{"An error has occurred: " + error.message}</Text>;

  return (
    <View style={[{ flex: 1, padding: spacing[12] }]}>
      <ScrollView>
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
      </ScrollView>
    </View>
  );
}

export { SpinView };
