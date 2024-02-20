import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";

import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { useSpins } from "../api/useSpins";
import { SpinsNav } from "../nav/types";
import { Image, ImageProps } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { fontSize, spacing } from "../theme/theme";
import { getArtist } from "./SpinCitation";
import { formatTime2 } from "../util/time";

const ITEM_SIZE = 80;

function Img(props: ImageProps) {
  if (!props.source) {
    return <Ionicons name={"disc-outline"} size={ITEM_SIZE} />;
  }
  return (
    <Image
      style={{
        width: ITEM_SIZE,
        aspectRatio: 1,
      }}
      source={props.source}
      // placeholder={{ uri: "https://via.placeholder.com/AVATAR_SIZE" }}
      contentFit="cover"
      transition={500}
    />
  );
}

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
          style={{ width: "100%" }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Img source={item?.image} />
            <View
              style={{
                flexDirection: "column",
                display: "flex",
                marginLeft: spacing[12],
                width: "100%",
              }}
            >
              <Text
                style={[
                  {
                    fontSize: fontSize["md"]["size"],
                    fontWeight: "bold",
                  },
                ]}
              >
                {item?.song}
              </Text>
              <Text
                style={[
                  {
                    fontSize: fontSize["sm"]["size"],
                  },
                ]}
              >
                {getArtist(item)}
              </Text>
              {item?.start && (
                <Text
                  style={[
                    {
                      fontSize: fontSize["sm"]["size"],
                    },
                  ]}
                >
                  {formatTime2(item?.start)}
                </Text>
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
