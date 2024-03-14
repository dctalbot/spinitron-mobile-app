import * as React from "react";
import { Image, ImageProps } from "expo-image"; // eslint-disable-line no-restricted-imports
import { AppIcon, AppIconProps } from "./AppIcon";

export interface AppImageProps extends ImageProps {
  icon: AppIconProps["name"];
  size?: number;
}

export function AppImage(props: AppImageProps) {
  const { size = 80, source, ...rest } = props;
  const [imgFailure, setImgFailure] = React.useState(false);

  if (!source || imgFailure) {
    return <AppIcon name={props.icon} size={size} />;
  }

  if (
    typeof source === "object" &&
    !Array.isArray(source) &&
    source?.uri?.includes("255x255") &&
    source?.uri?.includes("mzstatic")
  ) {
    source.uri = source.uri.replace("255x255", `${size}x${size}`);
  }

  return (
    <Image
      style={[{ width: size, aspectRatio: 1 }]}
      contentFit="cover"
      transition={500}
      onError={() => setImgFailure(true)}
      source={source}
      {...rest}
    />
  );
}
