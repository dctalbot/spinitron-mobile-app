import React from "react";
import { StyleSheet, View } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { useTheme } from "../../theme/useTheme";
import { AppText } from "../../ui/AppText";
import { useStreams } from "./useStreams";
import { spacing } from "../../theme/theme";

export function StreamPicker() {
  const { streams, selectedIndex, setStreamAsync } = useStreams();
  const theme = useTheme();

  if (streams.length < 2) {
    return null;
  }

  return (
    <View>
      <AppText size="lg" style={{ marginBottom: spacing[4] }}>
        Stream Options
      </AppText>
      <SegmentedControlTab
        values={streams.map((s) => s.text)}
        selectedIndex={selectedIndex}
        onTabPress={(i) => setStreamAsync(i)}
        activeTabStyle={{
          backgroundColor: theme.colors.primary,
        }}
        tabStyle={{
          backgroundColor: "transparent",
          borderColor: theme.colors.primary,
        }}
        activeTabTextStyle={{
          color: theme.colors.background,
        }}
        tabTextStyle={{ color: theme.colors.primary }}
      />
      <View style={styles.bitrateView}>
        {streams.map((s) => (
          <AppText key={s.uri} size="sm" style={styles.bitrateText}>
            {s.bitrate}
          </AppText>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bitrateView: {
    flexDirection: "row",
  },
  bitrateText: {
    flex: 1,
    padding: spacing[4],
  },
});
