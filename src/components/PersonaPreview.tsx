import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNav } from "../nav/types";
import { usePersona } from "../api/usePersona";
import { AppText } from "../ui/AppText";

interface PersonaPreviewProps {
  id: number;
}

export function PersonaPreview(props: PersonaPreviewProps) {
  const persona_id = props.id;
  const { isPending, error, data } = usePersona({ id: persona_id });
  const nav = useNavigation<StackNav>();

  if (isPending)
    return (
      <View>
        <ActivityIndicator />
      </View>
    );

  if (error) return null;

  return (
    <TouchableOpacity
      style={{
        padding: 10,
        borderWidth: 1,
        borderColor: "black",
      }}
      onPress={() =>
        nav.push("Persona", {
          id: persona_id,
          name: data.name,
        })
      }
    >
      <View>
        <AppText>{data.name}</AppText>
      </View>
    </TouchableOpacity>
  );
}
