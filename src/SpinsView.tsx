import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";

import { API_BASE_URL } from "../config";
import { SpinsAPI } from "../types/types";
import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigation, useRoute } from "@react-navigation/native";

function SpinsView() {
  const navigation = useNavigation();
  const route = useRoute();

  const playlist_id = route?.params?.playlist_id ?? "";

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<SpinsAPI>({
    queryKey: ["spins"],
    queryFn: async ({ pageParam }) => {
      const suffix = playlist_id ? `&playlist_id=${playlist_id}` : "";
      console.log(suffix);
      return fetch(API_BASE_URL + "/spins?page=" + pageParam + suffix).then(
        (res) => res.json()
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
            onPress={() => navigation.navigate("Spin", { id: item.id })}
          >
            <Text style={[{ height: 50 }]}>{item.song}</Text>
            <Text style={[{ height: 50 }]}>{item.artist}</Text>
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

export { SpinsView };
