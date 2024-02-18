import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";

import { FlashList } from "@shopify/flash-list";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSpins } from "../api/useSpins";
import { SpinsNav, SpinsRoute } from "../nav/types";

function SpinsView() {
  const nav = useNavigation<SpinsNav>();
  const route = useRoute<SpinsRoute>();

  const { data, error, fetchNextPage, isFetching, isFetchingNextPage } =
    useSpins({ playlist_id: route?.params?.playlist_id });

  const listdata = (data?.pages ?? []).map((page) => page.items).flat();

  if (isFetching && listdata.length === 0) return <Text>{"Loading..."}</Text>;

  if (error) return <Text>{"An error has occurred: " + error.message}</Text>;

  return (
    <View style={[{ flex: 1 }]}>
      <FlashList
        data={listdata}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => nav.push("Spin", { id: item?.id })}>
            <Text style={[{ height: 50 }]}>{item?.song}</Text>
            <Text style={[{ height: 50 }]}>{item?.artist}</Text>
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
