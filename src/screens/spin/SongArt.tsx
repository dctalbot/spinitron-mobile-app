import * as React from "react";

import { useWindowDimensions } from "react-native";
import { AppImage, AppImageProps } from "../../ui/AppImage";

export function SongArt(props: Partial<AppImageProps>) {
  // size just needs to be a rough appx of the actual container width
  const size = useWindowDimensions().width;

  return (
    <AppImage
      alt="Song cover art"
      source={props.source}
      icon="disc-outline"
      size={size}
      style={{
        width: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        aspectRatio: 1,
      }}
    />
  );
}
