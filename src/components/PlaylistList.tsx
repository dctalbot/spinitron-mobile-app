import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";

import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { StackNav } from "../nav/types";
import { fontSize, spacing } from "../theme/theme";
import { usePlaylists } from "../api/usePlaylists";

interface PlaylistListProps {
  queryInput: Parameters<typeof usePlaylists>[0];
}
function PlaylistList(props: PlaylistListProps) {
  const nav = useNavigation<StackNav>();

  const { data, error, fetchNextPage, isFetching, isFetchingNextPage } =
    usePlaylists(props.queryInput);

  const listdata = (data?.pages ?? []).map((page) => page.items).flat();

  if (isFetching && listdata.length === 0) return <Text>{"Loading..."}</Text>;

  if (error) return <Text>{"An error has occurred: " + error.message}</Text>;

  return (
    <FlashList
      data={listdata}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => nav.push("Playlist", { id: item?.id })}
          style={{ width: "100%" }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={[
                {
                  fontSize: fontSize["md"]["size"],
                  padding: spacing[12],
                },
              ]}
            >
              {item?.start} {item?.timezone}
            </Text>
          </View>
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

export { PlaylistList };
