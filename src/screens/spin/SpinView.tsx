import { ActivityIndicator, ScrollView, View } from "react-native";
import * as React from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useSpin } from "@dctalbot/react-spinitron";
import { StackNav, StackRoute } from "../../nav/types";
import { spacing } from "../../theme/theme";

import { SpinCitation } from "./SpinCitation";
import { AppText } from "../../ui/AppText";
import { AppButton } from "../../ui/AppButton";
import { SongArt } from "./SongArt";

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
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        padding: spacing[12],
        rowGap: spacing[12],
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SongArt source={data?.image} />
      </View>

      <View style={{ flexShrink: 1, flexGrow: 1 }}>
        <ScrollView>
          <SpinCitation id={id} />
        </ScrollView>

        {playlist_id && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
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
    </View>
  );
}

export { SpinView };
