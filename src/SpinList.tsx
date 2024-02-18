import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import * as React from "react";

import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { useSpins } from "./api/useSpins";
import { SpinsNav } from "./nav/types";

interface SpinListProps {
  useSpinsInput: Parameters<typeof useSpins>[0];
}
function SpinList(props: SpinListProps) {
  const nav = useNavigation<SpinsNav>();

  const { data, error, fetchNextPage, isFetching, isFetchingNextPage } =
    useSpins(props.useSpinsInput);

  const listdata = (data?.pages ?? []).map((page) => page.items).flat();

  if (isFetching && listdata.length === 0) return <Text>{"Loading..."}</Text>;

  if (error) return <Text>{"An error has occurred: " + error.message}</Text>;

  return (
    <FlashList
      data={listdata}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => nav.push("Spin", { id: item?.id, song: item?.song })}
        >
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
  );
}

export { SpinList };
