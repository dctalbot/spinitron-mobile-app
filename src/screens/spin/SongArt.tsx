import * as React from "react";

import { useWindowDimensions } from "react-native";
import { AppImage, AppImageProps } from "../../ui/AppImage";
import { spacing } from "../../theme/theme";

export function SongArt(props: Partial<AppImageProps>) {
  // for album art, size can be a rough appx
  // for fallback icons, size is literal (no content fit)
  const maxHeight = useWindowDimensions().height / 2 - spacing[12];
  const maxWidth = useWindowDimensions().width - spacing[64];
  const size = Math.min(maxHeight, maxWidth);

  return (
    <AppImage
      alt="Song cover art"
      source={props.source}
      icon="disc-outline"
      size={size}
      style={{
        height: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        aspectRatio: 1,
      }}
    />
  );
}
