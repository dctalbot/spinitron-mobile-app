import { ActivityIndicator, View } from "react-native";
import * as React from "react";
import { AppTouchableOpacity } from "../../ui/AppTouchableOpacity";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { StackNav } from "../../nav/types";
import { fontSize, spacing } from "../../theme/theme";
import { usePlaylists } from "@dctalbot/react-spinitron";
import { formatTime } from "../../util/time";
import { AppText } from "../../ui/AppText";

interface PlaylistListProps {
  queryInput: Parameters<typeof usePlaylists>[0];
}

export function PlaylistList(props: PlaylistListProps) {
  const nav = useNavigation<StackNav>();

  const {
    data,
    error,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
  } = usePlaylists(props.queryInput);

  const listdata = (data ?? []).filter((i) => i?.start);

  const onEndReached = () => {
    if (!isFetching && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  if (isFetching && listdata.length === 0) return null;

  if (error) return null;

  return (
    <FlashList
      data={listdata}
      keyExtractor={(item) => String(item?.id)}
      renderItem={({ item }) => (
        <AppTouchableOpacity
          onPress={() => nav.push("Playlist", { id: item?.id })}
          style={{ width: "100%" }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AppText
              style={[
                {
                  fontSize: fontSize["md"]["size"],
                  padding: spacing[12],
                },
              ]}
            >
              {formatTime(item?.start ?? "")}
            </AppText>
          </View>
        </AppTouchableOpacity>
      )}
      onEndReached={() => onEndReached()}
      ListFooterComponent={() => {
        return (
          <ActivityIndicator animating={isFetching || isFetchingNextPage} />
        );
      }}
    />
  );
}
