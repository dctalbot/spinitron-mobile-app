import { View } from "react-native";
import * as React from "react";

import { StyleSheet } from "react-native";
import { fontSize, fontWeight, spacing } from "../theme/theme";
import { ImageProps } from "expo-image";
import { AppText } from "../ui/AppText";
import { AppIconProps } from "../ui/AppIcon";
import { AppImage } from "../ui/AppImage";

interface HeadlineImageProps extends ImageProps {
  else?: AppIconProps["name"];
}

interface HeadlineProps {
  title: string;
  subtitle?: React.ReactNode;
  img?: HeadlineImageProps;
}

export function Headline(props: HeadlineProps) {
  return (
    <View style={styles.container}>
      <AppImage size={80} icon="person-outline" {...props.img} />

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
