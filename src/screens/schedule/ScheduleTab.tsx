import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import * as React from "react";

import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { useShows } from "../../api/useShows";
import { StackNav } from "../../nav/types";
import { Day, getScheduleDayRange, getTime } from "../../util/time";
import { AppText } from "../../ui/AppText";
import { AppSeparator } from "../../components/AppSeparator";
import { fontSize, spacing } from "../../theme/theme";
import dayjs from "dayjs";

interface ShowListItemProps {
  name?: string;
  host?: string;
  at?: string;
}

function ShowListItem(props: ShowListItemProps) {
  const { width } = useWindowDimensions();

  if (!props.name) return null;

  return (
    <View
      style={{
        padding: spacing["4"],
        flexDirection: "row",
        justifyContent: "space-between",
        display: "flex",
        maxWidth: width,
        width: width,
      }}
    >
      {/* left */}
      <View
        style={{
          flex: 1,
          marginRight: spacing["4"],
        }}
      >
        <AppText style={{ height: 50, fontSize: fontSize["lg"].size }}>
          {props.name}
        </AppText>
        {props.host && <AppText>{props.host}</AppText>}
      </View>

      {/* right */}
      <View style={{ flexShrink: 0 }}>
        <AppText style={{ fontSize: fontSize["sm"].size }}>{props.at}</AppText>
      </View>
    </View>
  );
}

interface ScheduleTabProps {
  day: Day;
}

export function ScheduleTab(props: ScheduleTabProps) {
  const nav = useNavigation<StackNav>();
  const [start, end] = getScheduleDayRange(props.day);

  const { data, error, fetchNextPage, isFetching, isFetchingNextPage } =
    useShows({
      start,
      end,
      count: 50,
    });

  const listdata = (data?.pages ?? [])
    .map((page) => page.items)
    .flat()
    .filter(
      (i) => Boolean(i?.title && i?.start) && dayjs(i?.start) >= dayjs(start)
    );

  if (isFetching && listdata.length === 0) return null;

  if (error)
    return <AppText>{"An error has occurred: " + error.message}</AppText>;

  return (
    <FlashList
      data={listdata}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity onPress={() => nav.push("Show", { id: item?.id })}>
            <ShowListItem name={item?.title} at={getTime(item?.start)} />
          </TouchableOpacity>
        );
      }}
      estimatedItemSize={60}
      onEndReached={() => fetchNextPage()}
      ListFooterComponent={() => {
        return (
          <ActivityIndicator animating={isFetching || isFetchingNextPage} />
        );
      }}
      ItemSeparatorComponent={AppSeparator}
    />
  );
}
