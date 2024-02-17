import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";

import { API_BASE_URL } from "../config";
import { ShowsAPI } from "../types/types";
import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";

function ShowsView() {
  const navigation = useNavigation();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<ShowsAPI>({
    queryKey: ["shows"],
    queryFn: async ({ pageParam }) => {
      return fetch(API_BASE_URL + "/shows?page=" + pageParam).then((res) =>
        res.json(),
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
            onPress={() => navigation.push("Show", { id: item.id })}
          >
            <Text style={[{ height: 50 }]}>{item.title}</Text>
          </TouchableOpacity>
        )}
        estimatedItemSize={50}
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

export { ShowsView };
