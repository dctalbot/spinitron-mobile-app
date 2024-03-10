import * as React from "react";
import { Image, ImageProps } from "expo-image";
import { AppIcon } from "../ui/AppIcon";

interface AvatarProps extends ImageProps {
  size: number;
}

export function Avatar(props: AvatarProps) {
  if (!props.source) {
    return <AppIcon name={"person-outline"} size={props.size} />;
  }
  return (
    <Image
      alt="DJ Profile Picture"
      style={{
        width: props.size,
        aspectRatio: 1,
      }}
      source={props.source}
      // placeholder={{ uri: "https://via.placeholder.com/AVATAR_SIZE" }}
      contentFit="cover"
      transition={500}
    />
  );
}
