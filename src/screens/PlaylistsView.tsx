import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import * as React from "react";

import { FlashList } from "@shopify/flash-list";
import { useNavigation, useRoute } from "@react-navigation/native";
import { usePlaylists } from "../api/usePlaylists";
import { StackNav, StackRoute } from "../nav/types";
import { AppText } from "../ui/AppText";

function PlaylistsView() {
  const nav = useNavigation<StackNav>();
  const route = useRoute<StackRoute<"Playlists">>();

  const show_id = route?.params?.show_id ?? 0;

  const { data, error, fetchNextPage, isFetching, isFetchingNextPage } =
    usePlaylists({ show_id });

  const listdata = (data?.pages ?? []).map((page) => page.items).flat();

  if (isFetching && listdata.length === 0)
    return <AppText>{"Loading..."}</AppText>;

  if (error)
    return <AppText>{"An error has occurred: " + error.message}</AppText>;

  return (
    <View style={[{ flex: 1 }]}>
      <FlashList
        data={listdata}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => nav.push("Playlist", { id: item?.id })}
          >
            {/* id: number;
                persona_id: number;
                show_id: number;
                start: string;
                end: string;
                duration: number;
                timezone: string;
                category: string;
                title: string;
                description: HTMLString;
                since: number;
                url: string;
                hide_dj: number;
                image: string;
                automation: number;
                episode_name: string;
                episode_description: HTMLString;
                spinsCount: string; */}
            <AppText style={[{ height: 50 }]}>{item?.start}</AppText>
          </TouchableOpacity>
        )}
        estimatedItemSize={100}
        onEndReached={() => fetchNextPage()}
        ListFooterComponent={() => {
          return (
            <ActivityIndicator animating={isFetching || isFetchingNextPage} />
          );
        }}
      />
    </View>
  );
}

export { PlaylistsView };
