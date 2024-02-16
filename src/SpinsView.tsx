import { Text, View } from "react-native";
import * as React from "react";

import { API_BASE_URL } from "../config";
import { SpinsAPI } from "../types/types";
import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";

function SpinsView() {
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
      console.log(pageParam);
      return fetch(API_BASE_URL + "/spins?page=" + pageParam).then((res) =>
        res.json()
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
          <>
            <Text style={[{ height: 50 }]}>{item.song}</Text>
            <Text style={[{ height: 50 }]}>{item.artist}</Text>
          </>
        )}
        estimatedItemSize={100}
        onEndReached={() => fetchNextPage()}
      />
    </View>
  );
}

export { SpinsView };
