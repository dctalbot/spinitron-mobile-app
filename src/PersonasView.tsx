import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";

import { API_BASE_URL } from "../config";
import { PersonasAPI } from "../types/types";
import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";

function PersonasView() {
  const navigation = useNavigation();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<PersonasAPI>({
    queryKey: ["personas"],
    queryFn: async ({ pageParam }) => {
      return fetch(API_BASE_URL + "/personas?page=" + pageParam).then((res) =>
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
          <TouchableOpacity
            onPress={() => navigation.push("Persona", { id: item.id })}
          >
            <Text style={[{ height: 50 }]}>{item.name}</Text>
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

export { PersonasView };
