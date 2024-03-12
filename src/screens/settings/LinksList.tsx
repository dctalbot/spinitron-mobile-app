import React, { useEffect, useState } from "react";
import { StyleSheet, View, Linking, Share } from "react-native";
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
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <AppIcon
        name={props.icon}
        size={28}
        style={styles.icon}
        color={theme.colors.primary}
      />
      <View style={styles.textContainer}>
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
    <View style={styles.linksView}>
      {config.call && (
        <Link
          onPress={() => Linking.openURL(`tel:${config.call?.phoneRaw}`)}
          text={`${config.call.text}${"\n"}${config.call?.phoneFormatted}`}
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

const styles = StyleSheet.create({
  linksView: {},
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing[10],
    marginTop: spacing[10],
  },
  textContainer: {
    flex: 1,
    marginLeft: spacing[16],
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    minWidth: 25,
  },
});
