import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";

import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { useShows } from "../api/useShows";
import { StackNav } from "../nav/types";

function ShowsView() {
  const nav = useNavigation<StackNav>();

  const { data, error, fetchNextPage, isFetching, isFetchingNextPage } =
    useShows();

  const listdata = (data?.pages ?? []).map((page) => page.items).flat();

  if (isFetching && listdata.length === 0) return <Text>{"Loading..."}</Text>;

  if (error) return <Text>{"An error has occurred: " + error.message}</Text>;

  return (
    <View style={[{ flex: 1 }]}>
      <FlashList
        data={listdata}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => nav.push("Show", { id: item?.id })}>
            <Text style={[{ height: 50 }]}>{item?.title}</Text>
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
