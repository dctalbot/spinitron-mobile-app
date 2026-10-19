import { ActivityIndicator, useWindowDimensions, View } from "react-native";
import * as React from "react";
import { AppTouchableOpacity } from "../../ui/AppTouchableOpacity";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { useSpins } from "@dctalbot/react-spinitron";
import { StackNav } from "../../nav/types";
import { fontWeight } from "../../theme/theme";
import { getArtist } from "./SpinCitation";
import { formatTime2 } from "../../util/time";
import { AppText } from "../../ui/AppText";
import { AppImage } from "../../ui/AppImage";
import {
  getSpinListItemRowStyle,
  getSpinListItemTextColumnStyle,
  getSpinListItemTextProps,
  SPIN_LIST_ART_SIZE,
} from "./spinListItemLayout";

const POLL_INTERVAL = 30000; // 30 seconds

type SpinItem = NonNullable<ReturnType<typeof useSpins>["data"]>[number];

const SpinListItem = React.memo(function SpinListItem(props: { item: SpinItem }) {
  const nav = useNavigation<StackNav>();
  const { item } = props;
  const song: string = item?.song ?? "";
  const artist: string = getArtist(item) ?? "";
  const at: string = item?.start ? formatTime2(item?.start) : "";
  const id = item?.id;
  const textProps = getSpinListItemTextProps();

  return (
    <AppTouchableOpacity onPress={() => nav.push("Spin", { id, song: item?.song })}>
      <View style={getSpinListItemRowStyle()}>
        <AppImage
          source={item?.image}
          size={SPIN_LIST_ART_SIZE}
          icon="disc-outline"
          recyclingKey={id != null ? String(id) : undefined}
        />
        <View style={getSpinListItemTextColumnStyle()}>
          {song ? (
            <AppText {...textProps} style={{ fontWeight: fontWeight.bold }}>
              {song}
            </AppText>
          ) : null}
          {artist ? (
            <AppText {...textProps} size="sm">
              {artist}
            </AppText>
          ) : null}
          {at ? (
            <AppText {...textProps} size="sm">
              {at}
            </AppText>
          ) : null}
        </View>
      </View>
    </AppTouchableOpacity>
  );
});

interface SpinListProps {
  useSpinsInput: Parameters<typeof useSpins>[0];
}

function SpinList(props: SpinListProps) {
  const { height } = useWindowDimensions();
  const { data, error, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } = useSpins(
    props.useSpinsInput,
    { refetchInterval: POLL_INTERVAL },
  );

  const listdata = data ?? [];

  const onEndReached = React.useCallback(() => {
    if (!isFetching && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetching, isFetchingNextPage]);

  const renderItem = React.useCallback(({ item }: { item: SpinItem }) => {
    return <SpinListItem item={item} />;
  }, []);

  const keyExtractor = React.useCallback((item: SpinItem) => String(item?.id), []);

  if (isFetching && listdata.length === 0) return null;

  if (error) return <AppText>{"An error has occurred: " + error.message}</AppText>;

  return (
    <FlashList
      data={listdata}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      drawDistance={height * 5}
      maintainVisibleContentPosition={{ disabled: true }}
      onEndReached={onEndReached}
      ListFooterComponent={<ActivityIndicator animating={isFetching || isFetchingNextPage} />}
    />
  );
}

export { SpinList };
