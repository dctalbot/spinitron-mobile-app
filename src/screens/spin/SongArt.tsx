import * as React from "react";

import { useWindowDimensions } from "react-native";
import { AppImage, AppImageProps } from "../../ui/AppImage";

export function SongArt(props: Partial<AppImageProps>) {
  const { width: _width } = useWindowDimensions();
  const width = _width - 24;

  return (
    <AppImage
      alt="Song cover art"
      source={props.source}
      icon="disc-outline"
      size={width}
    />
  );
}
