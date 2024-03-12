import { ActivityIndicator, View } from "react-native";
import * as React from "react";

import { useRoute } from "@react-navigation/native";
import { usePlaylist } from "../../api/hooks/usePlaylist";
import { StackRoute } from "../../nav/types";
import { SpinList } from "../../components/SpinList";
import { fmtOnAt } from "../../util/time";
import { fontSize, fontWeight, spacing } from "../../theme/theme";
import { AppText } from "../../ui/AppText";
import { useShow } from "../../api/hooks/useShow";
import { usePersona } from "../../api/hooks/usePersona";
import { PersonaLink } from "./PersonaLink";

function PlaylistView() {
  const route = useRoute<StackRoute<"Playlist">>();
  const id: number = route?.params?.id ?? 0;

  const { isPending, error, data: playlistData } = usePlaylist({ id });

  const show_id: number = playlistData?.show_id ?? 0;
  const persona_id: number = playlistData?.persona_id ?? 0;

  const { data: showData } = useShow(
    { id: show_id },
    { enabled: Boolean(show_id) }
  );

  const { data: personaData } = usePersona(
    { id: persona_id },
    { enabled: Boolean(persona_id) }
  );

  const showName = showData?.title ?? "";
  const dj = personaData?.name ?? "";
  const at = fmtOnAt(playlistData?.start);

  if (isPending)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );

  if (error)
    return <AppText>{"An error has occurred: " + error.message}</AppText>;

  return (
    <View style={[{ flex: 1 }]}>
      {showName && (
        <View style={{ padding: spacing[12] }}>
          <View style={{ flexDirection: "row", columnGap: spacing[12] }}>
            <View>
              <AppText
                style={{
                  fontSize: fontSize["2xl"].size,
                  lineHeight: fontSize["2xl"].lineHeight,
                  fontWeight: fontWeight.semibold,
                }}
              >
                {showName}
              </AppText>
              <View>
                {dj && <PersonaLink id={persona_id} text={dj} />}
                {at && <AppText>{at}</AppText>}
              </View>
            </View>
          </View>
        </View>
      )}

      <SpinList useSpinsInput={{ playlist_id: id }} />
    </View>
  );
}

export { PlaylistView };
