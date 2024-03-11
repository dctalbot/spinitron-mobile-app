import { TouchableOpacity, View } from "react-native";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNav } from "../nav/types";
import { usePersona } from "../api/usePersona";
import { AppText } from "../ui/AppText";
import { spacing } from "../theme/theme";

interface PersonaPreviewProps {
  id: number;
}

export function PersonaPreview(props: PersonaPreviewProps) {
  const persona_id = props.id;
  const { isPending, error, data } = usePersona({ id: persona_id });
  const nav = useNavigation<StackNav>();

  if (isPending) return null;
  if (error) return null;
  if (!data?.name) return null;

  return (
    <TouchableOpacity
      onPress={() =>
        nav.push("Persona", {
          id: persona_id,
          name: data.name,
        })
      }
    >
      <View
        style={{
          padding: spacing["12"],
        }}
      >
        <AppText>{data.name}</AppText>
      </View>
    </TouchableOpacity>
  );
}
