import { View } from "react-native";
import * as React from "react";

import { StyleSheet } from "react-native";
import { fontSize, fontWeight, spacing } from "../theme/theme";
import { Image, ImageProps } from "expo-image";
import { AppText } from "../ui/AppText";
import { AppIcon, AppIconProps } from "../ui/AppIcon";

interface HeadlineImageProps extends ImageProps {
  else?: AppIconProps["name"];
}

interface HeadlineProps {
  title: string;
  subtitle?: React.ReactNode;
  img?: HeadlineImageProps;
}

export function Headline(props: HeadlineProps) {
  const showImage: boolean = Boolean(props.img?.source);
  const showIcon: boolean = !showImage && Boolean(props.img?.else);

  return (
    <View style={styles.container}>
      {showIcon && (
        <AppIcon name={props.img?.else as AppIconProps["name"]} size={80} />
      )}
      {showImage && (
        <Image
          style={[{ width: 80, aspectRatio: 1 }]}
          contentFit="cover"
          transition={500}
          {...props.img}
        />
      )}

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
