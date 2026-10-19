import * as React from "react";

import { LayoutChangeEvent, useWindowDimensions, View } from "react-native";
import { AppImage, AppImageProps } from "../../ui/AppImage";
import { estimateSongArtSize, getSongArtSize } from "./songArtLayout";

export function SongArt(props: Partial<AppImageProps>) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const estimate = estimateSongArtSize({ windowWidth, windowHeight });
  const [size, setSize] = React.useState(estimate);
  const [prevEstimate, setPrevEstimate] = React.useState(estimate);

  // Re-seed only when the window changes (e.g. rotation). Do not use an
  // effect — that would overwrite onLayout after the first measure.
  if (estimate !== prevEstimate) {
    setPrevEstimate(estimate);
    setSize(estimate);
  }

  const onLayout = React.useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    const next = getSongArtSize(width, height);
    setSize((prev) => (prev === next ? prev : next));
  }, []);

  return (
    <View
      onLayout={onLayout}
      style={{
        flex: 1,
        width: "100%",
        minHeight: 0,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AppImage
        alt="Song cover art"
        source={props.source}
        icon="disc-outline"
        size={size}
      />
    </View>
  );
}
