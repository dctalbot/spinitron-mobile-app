import { TouchableOpacity, View } from "react-native";
import { useShow } from "../api/useShow";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNav } from "../nav/types";
import { AppText } from "../ui/AppText";
import { spacing } from "../theme/theme";

interface ShowPreviewProps {
  id: number;
}

export function ShowPreview(props: ShowPreviewProps) {
  const show_id = props.id;
  const { isPending, error, data } = useShow({ id: show_id });
  const nav = useNavigation<StackNav>();

  if (isPending) return null;

  if (error) return null;

  if (!isPending && !data?.title) return null;

  return (
    <TouchableOpacity
      style={{
        padding: spacing["12"],
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
