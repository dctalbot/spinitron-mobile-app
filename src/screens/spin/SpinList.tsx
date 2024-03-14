import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import * as React from "react";

import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { useSpins } from "../../api/hooks/useSpins";
import { StackNav } from "../../nav/types";
import { fontWeight, spacing } from "../../theme/theme";
import { getArtist } from "./SpinCitation";
import { formatTime2 } from "../../util/time";
import { AppText } from "../../ui/AppText";
import { AppImage } from "../../ui/AppImage";

const ITEM_SIZE = 80;
const POLL_INTERVAL = 30000; // 30 seconds

interface SpinListProps {
  useSpinsInput: Parameters<typeof useSpins>[0];
}
function SpinList(props: SpinListProps) {
  const nav = useNavigation<StackNav>();

  const { data, error, fetchNextPage, isFetching, isFetchingNextPage } =
    useSpins(props.useSpinsInput, { refetchInterval: POLL_INTERVAL });

  const listdata = (data?.pages ?? []).map((page) => page.items).flat();

  if (isFetching && listdata.length === 0) return null;

  if (error)
    return <AppText>{"An error has occurred: " + error.message}</AppText>;

  return (
    <FlashList
      data={listdata}
      renderItem={({ item }) => {
        const song: string = item?.song ?? "";
        const artist: string = getArtist(item) ?? "";
        const at: string = item?.start ? formatTime2(item?.start) : "";

        return (
          <TouchableOpacity
            onPress={() => nav.push("Spin", { id: item?.id, song: item?.song })}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AppImage
                source={item?.image}
                size={ITEM_SIZE}
                icon="disc-outline"
              />
              <View
                style={{
                  flexDirection: "column",
                  paddingLeft: spacing[12],
                  paddingRight: spacing[12],
                  minHeight: "100%",
                  flexShrink: 1,
                }}
              >
                {song && (
                  <AppText style={{ fontWeight: fontWeight.bold }}>
                    {song}
                  </AppText>
                )}
                {artist && <AppText size="sm">{artist}</AppText>}
                {at && <AppText size="sm">{at}</AppText>}
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
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
