import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";

import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { usePersonas } from "../api/usePersonas";
import { StackNav } from "../nav/types";
import { Avatar } from "../components/Avatar";
import { fontSize, spacing } from "../theme/theme";

function PersonasView() {
  const nav = useNavigation<StackNav>();

  const { data, error, fetchNextPage, isFetching, isFetchingNextPage } =
    usePersonas();

  const listdata = (data?.pages ?? []).map((page) => page.items).flat();

  if (isFetching && listdata.length === 0) return <Text>{"Loading..."}</Text>;

  if (error) return <Text>{"An error has occurred: " + error.message}</Text>;

  return (
    <View style={[{ flex: 1 }]}>
      <FlashList
        data={listdata}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              nav.push("Persona", { id: item?.id, name: item?.name })
            }
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Avatar size={50} source={item?.image} />
              <Text
                style={[
                  {
                    marginLeft: spacing[12],
                    fontSize: fontSize["md"]["size"],
                  },
                ]}
              >
                {item?.name}
              </Text>
            </View>
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
