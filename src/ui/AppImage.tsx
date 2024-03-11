import * as React from "react";
import { Image, ImageProps } from "expo-image"; // eslint-disable-line no-restricted-imports
import { AppIcon, AppIconProps } from "./AppIcon";

export interface AppImageProps extends ImageProps {
  icon: AppIconProps["name"];
  size?: number;
}

export function AppImage(props: AppImageProps) {
  const { size = 80, ...rest } = props;
  const [imgFailure, setImgFailure] = React.useState(false);

  if (!props.source || imgFailure) {
    return <AppIcon name={props.icon} size={size} />;
  }

  return (
    <Image
      style={[{ width: size, aspectRatio: 1 }]}
      contentFit="cover"
      transition={500}
      onError={() => setImgFailure(true)}
      {...rest}
    />
  );
}
