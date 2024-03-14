import * as React from "react";
import { Image, ImageProps } from "expo-image"; // eslint-disable-line no-restricted-imports
import { AppIcon, AppIconProps } from "./AppIcon";
import { mzstaticUpgrade } from "../util/mzstatic";

export interface AppImageProps extends ImageProps {
  icon: AppIconProps["name"];
  size?: number;
}

export function AppImage(props: AppImageProps) {
  const { size = 80, source, ...rest } = props;
  const [imgFailure, setImgFailure] = React.useState(false);
  let newSource = source;

  if (!source || imgFailure) {
    return <AppIcon name={props.icon} size={size} />;
  }

  if (typeof source === "string") {
    newSource = mzstaticUpgrade(source, size);
    console.log("hit!", newSource);
  }

  return (
    <Image
      style={[{ width: size, aspectRatio: 1 }]}
      contentFit="cover"
      transition={500}
      onError={() => setImgFailure(true)}
      source={newSource}
      {...rest}
    />
  );
}
