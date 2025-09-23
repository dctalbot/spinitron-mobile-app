import React from "react";
import { View, Linking, Share, Platform } from "react-native";
import Constants from "expo-constants";
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

function getReviewURL(): string | null {
  const androidPackage = Constants.expoConfig?.android?.package || "";
  const iosAppStoreUrl = Constants.expoConfig?.ios?.appStoreUrl || "";
  const iosItemId = iosAppStoreUrl.match(/\d+$/)?.[0] || "";

  if (Platform.OS === "android" && androidPackage) {
    return `market://details?id=${androidPackage}&showAllReviews=true`;
  }
  if (["ios", "macos"].includes(Platform.OS) && iosItemId) {
    return `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${iosItemId}?action=write-review`;
  }
  return null;
}

export const LinksList = () => {
  let reviewURL = getReviewURL();

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
      {config.review && reviewURL && (
        <Link
          onPress={() => Linking.openURL(reviewURL)}
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
