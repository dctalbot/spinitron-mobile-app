import * as React from "react";
import { View } from "react-native";
import { Image, ImageProps } from "expo-image"; // eslint-disable-line no-restricted-imports
import { AppIcon, AppIconProps } from "./AppIcon";
import { mzstaticUpgrade } from "../util/mzstatic";

export interface AppImageProps extends ImageProps {
  icon: AppIconProps["name"];
  size?: number;
}

export function AppImage(props: AppImageProps) {
  const { size = 80, source: _src, recyclingKey, transition = 0, icon, style, ...rest } = props;
  const sourceKey = typeof _src === "string" ? _src : null;
  const resolvedKey = recyclingKey ?? sourceKey;
  const [failedKey, setFailedKey] = React.useState<string | null>(null);
  const failed = resolvedKey != null && failedKey === resolvedKey;

  const source =
    sourceKey && !failed
      ? mzstaticUpgrade(sourceKey, size)
      : !sourceKey && _src && !failed
        ? _src
        : null;

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
    >
      {/* Always mounted so recycled list cells never flash an empty hole */}
      <AppIcon name={icon} size={size} style={{ position: "absolute" }} />
      {source ? (
        <Image
          style={{ width: size, height: size }}
          contentFit="cover"
          transition={transition}
          cachePolicy="memory-disk"
          recyclingKey={resolvedKey}
          onError={() => {
            if (resolvedKey != null) setFailedKey(resolvedKey);
          }}
          source={source}
          {...rest}
        />
      ) : null}
    </View>
  );
}
