import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";

import { FlashList } from "@shopify/flash-list";
import { useNavigation, useRoute } from "@react-navigation/native";
import { usePlaylists } from "../api/usePlaylists";
import { PlaylistsNav, PlaylistsRoute } from "../nav/types";

function PlaylistsView() {
  const nav = useNavigation<PlaylistsNav>();
  const route = useRoute<PlaylistsRoute>();

  const show_id = route?.params?.show_id ?? 0;

  const { data, error, fetchNextPage, isFetching, isFetchingNextPage } =
    usePlaylists({ show_id });

  const listdata = (data?.pages ?? []).map((page) => page.items).flat();

  if (isFetching && listdata.length === 0) return <Text>{"Loading..."}</Text>;

  if (error) return <Text>{"An error has occurred: " + error.message}</Text>;

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
            <Text style={[{ height: 50 }]}>{item?.start}</Text>
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
