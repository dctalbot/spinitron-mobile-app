import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { useShow } from "../api/useShow";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNav } from "../nav/types";
import { AppText } from "../ui/AppText";

interface ShowPreviewProps {
  id: number;
}

export function ShowPreview(props: ShowPreviewProps) {
  const show_id = props.id;
  const { isPending, error, data } = useShow({ id: show_id });
  const nav = useNavigation<StackNav>();

  if (isPending)
    return (
      <View>
        <ActivityIndicator />
      </View>
    );

  if (error) return null;

  if (!isPending && !data?.title) return null;

  return (
    <TouchableOpacity
      style={{
        padding: 10,
        borderWidth: 1,
        borderColor: "black",
      }}
      onPress={() =>
        nav.push("Show", {
          id: show_id,
          title: data.title,
        })
      }
    >
      <View>
        <AppText>{data.title}</AppText>
      </View>
    </TouchableOpacity>
  );
}
