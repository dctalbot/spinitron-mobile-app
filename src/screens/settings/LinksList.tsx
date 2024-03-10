import React, { useEffect, useState } from "react";
import { StyleSheet, View, Linking, Share, Alert, Text } from "react-native";
import * as StoreReview from "expo-store-review";
import {
  GOOGLE_HANGOUTS_URL,
  DONATION_URL,
  STUDIO_PHONE_FORMATTED,
  STUDIO_PHONE_RAW,
} from "../../../config";

import { TouchableOpacity, GestureResponderEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface LinkProps {
  onPress: (event: GestureResponderEvent) => void;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  text: string;
}

export function Link(props: LinkProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Ionicons name={props.icon} size={28} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text>{props.text}</Text>
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
      <Link
        onPress={() => Linking.openURL(`tel:${STUDIO_PHONE_RAW}`)}
        text={`Studio request line${"\n"}${STUDIO_PHONE_FORMATTED}`}
        icon={"call"}
      />
      <Link
        onPress={() => Linking.openURL(GOOGLE_HANGOUTS_URL)}
        text={"Message the DJ"}
        icon={"chatbubble"}
      />
      <Link
        onPress={() =>
          Share.share({
            message: "I'm listening to WCBN-FM Ann Arbor!",
          })
        }
        text={"Share on social media"}
        icon={"share-outline"}
      />
      <Link
        onPress={() =>
          canRequestReview
            ? StoreReview.requestReview()
            : Alert.alert("Store review not available on this device.")
        }
        text={"Write a review!"}
        icon={"thumbs-up"}
      />
      {/* <Link
        onPress={() => toggleTheme()}
        text={`Switch to ${theme.opposite} mode`}
        icon={"bulb"}
      /> */}
      <Link
        onPress={() => Linking.openURL(DONATION_URL)}
        text={"Give to WCBN"}
        icon={"cash"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  linksView: {},
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    minWidth: 25,
  },
});
