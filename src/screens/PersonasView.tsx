import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";

import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { usePersonas } from "../api/usePersonas";
import { PersonasNav } from "../nav/types";

function PersonasView() {
  const nav = useNavigation<PersonasNav>();

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
            <Text style={[{ height: 50 }]}>{item?.name}</Text>
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
