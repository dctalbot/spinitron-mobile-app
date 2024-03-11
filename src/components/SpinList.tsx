import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import * as React from "react";

import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { useSpins } from "../api/useSpins";
import { StackNav } from "../nav/types";
import { fontSize, spacing } from "../theme/theme";
import { getArtist } from "./SpinCitation";
import { formatTime2 } from "../util/time";
import { AppText } from "../ui/AppText";
import { AppImage } from "../ui/AppImage";

const ITEM_SIZE = 80;

interface SpinListProps {
  useSpinsInput: Parameters<typeof useSpins>[0];
}
function SpinList(props: SpinListProps) {
  const nav = useNavigation<StackNav>();

  const { data, error, fetchNextPage, isFetching, isFetchingNextPage } =
    useSpins(props.useSpinsInput);

  const listdata = (data?.pages ?? []).map((page) => page.items).flat();

  if (isFetching && listdata.length === 0) return null;

  if (error)
    return <AppText>{"An error has occurred: " + error.message}</AppText>;

  return (
    <FlashList
      data={listdata}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => nav.push("Spin", { id: item?.id, song: item?.song })}
          style={{ width: "100%" }}
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
                display: "flex",
                marginLeft: spacing[12],
                width: "100%",
              }}
            >
              <AppText
                style={[
                  {
                    fontSize: fontSize["md"]["size"],
                    fontWeight: "bold",
                  },
                ]}
              >
                {item?.song}
              </AppText>
              <AppText
                style={[
                  {
                    fontSize: fontSize["sm"]["size"],
                  },
                ]}
              >
                {getArtist(item)}
              </AppText>
              {item?.start && (
                <AppText
                  style={[
                    {
                      fontSize: fontSize["sm"]["size"],
                    },
                  ]}
                >
                  {formatTime2(item?.start)}
                </AppText>
              )}
            </View>
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

export { SpinList };
