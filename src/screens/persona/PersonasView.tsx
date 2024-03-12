import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import * as React from "react";

import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { usePersonas } from "../../api/hooks/usePersonas";
import { StackNav } from "../../nav/types";
import { spacing } from "../../theme/theme";
import { AppText } from "../../ui/AppText";
import { AppImage } from "../../ui/AppImage";
import { MAX_COUNT } from "../../api/util/constants";

function PersonasView() {
  const nav = useNavigation<StackNav>();

  const { data, error, fetchNextPage, isFetching, isFetchingNextPage } =
    usePersonas({ count: MAX_COUNT });

  const listdata = (data?.pages ?? []).map((page) => page.items).flat();

  if (isFetching && listdata.length === 0)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );

  if (error)
    return <AppText>{"An error has occurred: " + error.message}</AppText>;

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
              <AppImage size={50} source={item?.image} icon="person-outline" />
              <AppText
                style={[
                  {
                    marginLeft: spacing[12],
                  },
                ]}
              >
                {item?.name}
              </AppText>
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
