import React, { useEffect, useState } from "react";
import { View, Linking, Share } from "react-native";
import * as StoreReview from "expo-store-review";
import { config } from "../../config";

import { TouchableOpacity, GestureResponderEvent } from "react-native";
import { AppText } from "../../ui/AppText";
import { AppIcon } from "../../ui/AppIcon";
import { spacing } from "../../theme/theme";
import { useTheme } from "../../theme/useTheme";

interface LinkProps {
  onPress: (event: GestureResponderEvent) => void;
  icon: React.ComponentProps<typeof AppIcon>["name"];
  text: string;
}

export function Link(props: LinkProps) {
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: spacing[12],
      }}
      onPress={props.onPress}
    >
      <AppIcon name={props.icon} size={28} color={theme.colors.primary} />
      <View
        style={{
          flex: 1,
          marginLeft: spacing[16],
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <AppText>{props.text}</AppText>
      </View>
    </TouchableOpacity>
  );
}

export const LinksList = () => {
  const [canRequestReview, setCanRequestReview] = useState(true);

  useEffect(() => {
    const doAsync = async () => {
      const hasAction = await StoreReview.hasAction();
      setCanRequestReview(hasAction);
    };
    doAsync();
  }, []);

  return (
    <View>
      {config.phone && (
        <Link
          onPress={() => Linking.openURL(`tel:${config.phone?.numberRaw}`)}
          text={`${config.phone.text}${"\n"}${config.phone?.numberFormatted}`}
          icon={"call"}
        />
      )}
      {config.chat && (
        <Link
          onPress={() => Linking.openURL(config.chat?.url ?? "")}
          text={config.chat.text}
          icon={"chatbubble"}
        />
      )}
      {config.share && (
        <Link
          onPress={() =>
            Share.share({
              message: config.share?.message ?? "",
            })
          }
          text={config.share.text}
          icon={"share-outline"}
        />
      )}
      {config.review && canRequestReview && (
        <Link
          onPress={() => StoreReview.requestReview()}
          text={config.review.text}
          icon={"thumbs-up"}
        />
      )}
      {config.donate && (
        <Link
          onPress={() => Linking.openURL(config.donate?.url ?? "")}
          text={config.donate.text}
          icon={"cash"}
        />
      )}
    </View>
  );
};
