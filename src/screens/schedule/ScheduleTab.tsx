import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import * as React from "react";

import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { ShowsQueryData, useShows } from "../../api/hooks/useShows";
import { StackNav } from "../../nav/types";
import { Day, getScheduleDayRange, getTime } from "../../util/time";
import { AppText } from "../../ui/AppText";
import { AppSeparator } from "../../ui/AppSeparator";
import { fontSize, fontWeight, spacing } from "../../theme/theme";
import dayjs from "dayjs";
import { getResourceID } from "../../api/util/getResourceID";
import _ from "lodash";
import { usePersona } from "../../api/hooks/usePersona";

interface ShowListItemProps {
  item: NonNullable<ShowsQueryData["items"]>[number];
}

function ShowListItem(props: ShowListItemProps) {
  const name = props.item?.title;
  const at = getTime(props.item?.start);
  const personaIDs = _.get(props.item, "_links.personas", []).map(
    (
      x: any // eslint-disable-line @typescript-eslint/no-explicit-any
    ) => getResourceID(x.href)
  );

  const { width } = useWindowDimensions();

  const { data } = usePersona(
    {
      id: personaIDs[0],
    },
    {
      enabled: personaIDs.length === 1,
    }
  );

  let host = " ";
  if (personaIDs.length > 1) {
    host = `rotating hosts`;
  } else {
    host = _.get(data, "name", " ");
  }
  if (host.toLowerCase() === "rotating hosts") {
    host = "rotating hosts";
  }
  host = "with " + host;

  if (!name) return null;

  return (
    <View
      style={{
        padding: spacing["8"],
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
        <AppText
          style={{
            fontSize: fontSize["lg"].size,
            minHeight: fontSize["lg"].lineHeight,
            fontWeight: fontWeight.semibold,
          }}
        >
          {name}
        </AppText>
        <AppText
          style={{
            fontStyle: "italic",
          }}
        >
          {host}
        </AppText>
      </View>

      {/* right */}
      <View style={{ flexShrink: 0 }}>
        <AppText style={{ fontSize: fontSize["sm"].size }}>{at}</AppText>
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

  const { data, error, isFetching } = useShows({
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

  if (isFetching && listdata.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error)
    return <AppText>{"An error has occurred: " + error.message}</AppText>;

  return (
    <FlashList
      data={listdata}
      renderItem={({ item }) => {
        if (!item) return null;

        return (
          <TouchableOpacity
            onPress={() =>
              nav.push("Show", { id: item?.id, title: item.title })
            }
          >
            <ShowListItem item={item} />
          </TouchableOpacity>
        );
      }}
      estimatedItemSize={55}
      ItemSeparatorComponent={AppSeparator}
    />
  );
}
