import { AppTouchableOpacity } from "../../ui/AppTouchableOpacity";
import * as React from "react";

import { useNavigation } from "@react-navigation/native";
import { StackNav } from "../../nav/types";
import { AppText } from "../../ui/AppText";
import { fontSize, fontWeight } from "../../theme/theme";
import { useShow } from "@dctalbot/react-spinitron";

interface ShowLinkProps {
  id: number;
}

export function ShowLink({ id }: ShowLinkProps) {
  const nav = useNavigation<StackNav>();

  const { data } = useShow({ id }, { enabled: Boolean(id) });

  const title = data?.title ?? "";

  if (!title) {
    return null;
  }

  return (
    <AppTouchableOpacity
      onPress={() =>
        nav.push("Show", {
          id,
          title,
        })
      }
    >
      <AppText
        style={{
          fontSize: fontSize["2xl"].size,
          lineHeight: fontSize["2xl"].lineHeight,
          fontWeight: fontWeight.semibold,
        }}
      >
        {title}
      </AppText>
    </AppTouchableOpacity>
  );
}
