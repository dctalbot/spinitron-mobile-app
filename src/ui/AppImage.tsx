import * as React from "react";
import { Image, ImageProps } from "expo-image"; // eslint-disable-line no-restricted-imports
import { AppIcon, AppIconProps } from "./AppIcon";
import { mzstaticUpgrade } from "../util/mzstatic";

export interface AppImageProps extends ImageProps {
  icon: AppIconProps["name"];
  size?: number;
}

export function AppImage(props: AppImageProps) {
  const { size = 80, source: _src, ...rest } = props;
  const [imgFailure, setImgFailure] = React.useState(false);
  let source = _src;

  if (!source || imgFailure) {
    return <AppIcon name={props.icon} size={size} />;
  }

  if (typeof source === "string") {
    source = mzstaticUpgrade(source, size);
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
