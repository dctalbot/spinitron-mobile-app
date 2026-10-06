import { ActivityIndicator, useWindowDimensions, View } from "react-native";
import * as React from "react";

import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { usePersonas } from "@dctalbot/react-spinitron";
import { StackNav } from "../../nav/types";
import { spacing } from "../../theme/theme";
import { AppText } from "../../ui/AppText";
import { AppImage } from "../../ui/AppImage";
import { MAX_COUNT } from "@dctalbot/react-spinitron";
import { AppTouchableOpacity } from "../../ui/AppTouchableOpacity";

const ITEM_SIZE = 50;

type PersonaItem = NonNullable<ReturnType<typeof usePersonas>["data"]>[number];

const PersonaListItem = React.memo(function PersonaListItem(props: { item: PersonaItem }) {
  const nav = useNavigation<StackNav>();
  const { item } = props;
  const id = item?.id;

  return (
    <AppTouchableOpacity onPress={() => nav.push("Persona", { id, name: item?.name })}>
      <View
        style={{
          height: ITEM_SIZE,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <AppImage
          size={ITEM_SIZE}
          source={item?.image}
          icon="person-outline"
          recyclingKey={id != null ? String(id) : undefined}
        />
        <AppText
          style={{
            marginLeft: spacing[12],
          }}
        >
          {item?.name}
        </AppText>
      </View>
    </AppTouchableOpacity>
  );
});

function PersonasView() {
  const { height } = useWindowDimensions();

  const { data, error, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } = usePersonas({
    count: MAX_COUNT,
  });

  const listdata = data ?? [];

  const onEndReached = React.useCallback(() => {
    if (!isFetching && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetching, isFetchingNextPage]);

  const renderItem = React.useCallback(({ item }: { item: PersonaItem }) => {
    return <PersonaListItem item={item} />;
  }, []);

  const keyExtractor = React.useCallback((item: PersonaItem) => String(item?.id), []);

  if (isFetching && listdata.length === 0)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );

  if (error) return <AppText>{"An error has occurred: " + error.message}</AppText>;

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={listdata}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        drawDistance={height * 5}
        maintainVisibleContentPosition={{ disabled: true }}
        onEndReached={onEndReached}
        ListFooterComponent={<ActivityIndicator animating={isFetching || isFetchingNextPage} />}
      />
    </View>
  );
}

export { PersonasView };
