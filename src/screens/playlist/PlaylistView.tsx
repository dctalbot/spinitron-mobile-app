import { ActivityIndicator, View } from "react-native";
import * as React from "react";

import { useRoute } from "@react-navigation/native";
import { usePlaylist } from "../../api/usePlaylist";
import { StackRoute } from "../../nav/types";
import { SpinList } from "../../components/SpinList";
import { fmtOnAt } from "../../util/time";
import { Headline } from "../../components/Headline";
import { spacing } from "../../theme/theme";
import { AppText } from "../../ui/AppText";
import { useShow } from "../../api/useShow";
import { usePersona } from "../../api/usePersona";
import { PersonaLink } from "./PersonaLink";

function PlaylistView() {
  const route = useRoute<StackRoute<"Playlist">>();
  const id: number = route?.params?.id ?? 0;

  const { isPending, error, data: playlistData } = usePlaylist({ id });

  const show_id: number = playlistData?.show_id ?? 0;
  const persona_id: number = playlistData?.persona_id ?? 0;

  const { data: showData } = useShow(
    { id: show_id },
    { enabled: Boolean(show_id) },
  );

  const { data: personaData } = usePersona(
    { id: persona_id },
    { enabled: Boolean(persona_id) },
  );

  const showName = showData?.title ?? "";
  const dj = personaData?.name ?? "";
  const at = fmtOnAt(playlistData?.start);

  if (isPending)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );

  if (error)
    return <AppText>{"An error has occurred: " + error.message}</AppText>;

  return (
    <View style={[{ flex: 1 }]}>
      {showName && (
        <View style={{ padding: spacing[12] }}>
          <Headline
            title={showName}
            subtitle={
              <View>
                {dj && <PersonaLink id={persona_id} text={dj} />}
                {at && <AppText>{at}</AppText>}

                {/* {data.episode_description && (
                      <AppHTML
                        contentWidth={width}
                        source={{ html: data.episode_description }}
                      />
                    )} */}
              </View>
            }
          />
        </View>
      )}

      <SpinList useSpinsInput={{ playlist_id: id }} />
    </View>
  );
}

export { PlaylistView };
