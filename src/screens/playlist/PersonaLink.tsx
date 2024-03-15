import { TouchableOpacity, View } from "react-native";
import * as React from "react";

import { useNavigation } from "@react-navigation/native";
import { StackNav } from "../../nav/types";
import { AppText } from "../../ui/AppText";
import { useTheme } from "../../theme/useTheme";
import { usePersona } from "@dctalbot/react-spinitron";

interface PersonaLinkProps {
  id: number;
}

export function PersonaLink({ id }: PersonaLinkProps) {
  const theme = useTheme();
  const nav = useNavigation<StackNav>();

  const { data } = usePersona({ id }, { enabled: Boolean(id) });

  const name = data?.name ?? "";

  if (!name) {
    return null;
  }

  return (
    <View style={{ flexDirection: "row" }}>
      <AppText style={{ fontStyle: "italic" }}>
        <AppText>with </AppText>
      </AppText>

      <TouchableOpacity
        onPress={() =>
          nav.push("Persona", {
            id,
            name,
          })
        }
      >
        <AppText
          style={{ fontStyle: "italic", color: theme.nav.colors.primary }}
        >
          {name}
        </AppText>
      </TouchableOpacity>
    </View>
  );
}
