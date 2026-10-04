import { ActivityIndicator, useWindowDimensions, View } from "react-native";
import { AppTouchableOpacity } from "../../ui/AppTouchableOpacity";
import * as React from "react";

import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { ShowsData, useShows } from "@dctalbot/react-spinitron";
import { StackNav } from "../../nav/types";
import { Day, getScheduleDayRange, getTime } from "../../util/time";
import { AppText } from "../../ui/AppText";
import { AppSeparator } from "../../ui/AppSeparator";
import { fontSize, fontWeight, spacing } from "../../theme/theme";
import { getResourceID } from "@dctalbot/react-spinitron";
import { usePersona } from "@dctalbot/react-spinitron";
import { useTheme } from "../../theme/useTheme";

type ShowItem = NonNullable<ShowsData["items"]>[number];

const ITEM_HEIGHT = spacing["8"] * 2 + fontSize["lg"].lineHeight + fontSize["md"].lineHeight;

const ShowListItem = React.memo(function ShowListItem(props: { item: ShowItem }) {
  const theme = useTheme();
  const nav = useNavigation<StackNav>();
  const name = props.item?.title ?? "";
  const at = getTime(props.item?.start);
  const id = props.item?.id;
  const personaIDs = (props.item?._links?.personas ?? [])
    .map((x) => x.href)
    .filter((href): href is string => Boolean(href))
    .map((href) => getResourceID(href));

  const { data } = usePersona(
    {
      id: personaIDs[0],
    },
    {
      enabled: personaIDs.length === 1,
    },
  );

  let host = "";
  if (personaIDs.length > 1) {
    host = "rotating hosts";
  } else {
    host = data?.name ?? "";
  }
  if (host.toLowerCase() === "rotating hosts") {
    host = "rotating hosts";
  }

  return (
    <AppTouchableOpacity onPress={() => nav.push("Show", { id, title: props.item.title })}>
      <View
        style={{
          height: ITEM_HEIGHT,
          paddingHorizontal: spacing["8"],
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View
          style={{
            flex: 1,
            marginRight: spacing["4"],
            justifyContent: "center",
          }}
        >
          <AppText
            style={{
              fontSize: fontSize["lg"].size,
              lineHeight: fontSize["lg"].lineHeight,
              fontWeight: fontWeight.semibold,
            }}
          >
            {name}
          </AppText>
          <AppText style={{ fontStyle: "italic" }}>
            {host ? (
              <>
                <AppText>{"with "}</AppText>
                <AppText style={{ color: theme.colors.primary }}>{host}</AppText>
              </>
            ) : (
              " "
            )}
          </AppText>
        </View>

        <View style={{ flexShrink: 0 }}>
          <AppText style={{ fontSize: fontSize["sm"].size }}>{at}</AppText>
        </View>
      </View>
    </AppTouchableOpacity>
  );
});

interface ScheduleTabProps {
  day: Day;
}

export function ScheduleTab(props: ScheduleTabProps) {
  const { height } = useWindowDimensions();
  const [start, end] = getScheduleDayRange(props.day);

  const { data, error, isFetching } = useShows({
    start,
    end,
    count: 50,
  });

  const listdata = React.useMemo(
    () =>
      (data ?? []).filter((i) => i?.title && i?.start && Date.parse(i.start) >= Date.parse(start)),
    [data, start],
  );

  const renderItem = React.useCallback(({ item }: { item: ShowItem }) => {
    return <ShowListItem item={item} />;
  }, []);

  const keyExtractor = React.useCallback(
    (item: ShowItem) => String(item?.id) + String(item?.start),
    [],
  );

  if (isFetching && listdata.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) return <AppText>{"An error has occurred: " + error.message}</AppText>;

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={listdata}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        drawDistance={height * 5}
        maintainVisibleContentPosition={{ disabled: true }}
        ItemSeparatorComponent={AppSeparator}
      />
    </View>
  );
}
