import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";

import { API_BASE_URL } from "../config";
import { PlaylistsAPI } from "../types/types";
import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigation, useRoute } from "@react-navigation/native";

function PlaylistsView() {
  const navigation = useNavigation();
  const route = useRoute();

  const show_id = route?.params?.show_id ?? "";

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<PlaylistsAPI>({
    queryKey: ["playlists", show_id],
    queryFn: async ({ pageParam }) => {
      const suffix = show_id ? `&show_id=${show_id}` : "";
      console.log(suffix);
      return fetch(API_BASE_URL + "/playlists?page=" + pageParam + suffix).then(
        (res) => res.json(),
      );
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage._meta.currentPage + 1,
  });

  const listdata = (data?.pages ?? []).map((page) => page.items).flat();

  if (isFetching && listdata.length === 0) return <Text>{"Loading..."}</Text>;

  if (error) return <Text>{"An error has occurred: " + error.message}</Text>;

  return (
    <View style={[{ flex: 1 }]}>
      <FlashList
        data={listdata}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.push("Playlist", {
                id: item.id,
              })
            }
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
            <Text style={[{ height: 50 }]}>{item.start}</Text>
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
