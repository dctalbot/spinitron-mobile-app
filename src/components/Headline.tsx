import { View } from "react-native";
import * as React from "react";

import { StyleSheet } from "react-native";
import { fontSize, fontWeight, spacing } from "../theme/theme";
import { AppText } from "../ui/AppText";
import { AppImage, AppImageProps } from "../ui/AppImage";

interface HeadlineProps {
  title: string;
  subtitle?: React.ReactNode;
  img?: AppImageProps;
}

export function Headline(props: HeadlineProps) {
  return (
    <View style={styles.container}>
      {props.img && <AppImage size={80} {...props.img} />}

      <View style={styles.rhs}>
        <AppText style={styles.title}>{props.title}</AppText>
        {props.subtitle}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: spacing[12],
  },
  rhs: {},
  title: {
    fontSize: fontSize["2xl"].size,
    lineHeight: fontSize["2xl"].lineHeight,
    fontWeight: fontWeight.semibold,
  },
});
