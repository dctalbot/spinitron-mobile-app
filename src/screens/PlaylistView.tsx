import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import * as React from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { usePlaylist } from "../api/usePlaylist";
import { StackNav, StackRoute } from "../nav/types";
import { SpinList } from "../components/SpinList";
import { fmtOnAt } from "../util/time";
import { Headline } from "../components/Headline";
import { spacing } from "../theme/theme";
import { AppText } from "../ui/AppText";
import { useShow } from "../api/useShow";
import { usePersona } from "../api/usePersona";
import { useTheme } from "../theme/useTheme";

interface PersonaLinkProps {
  id: number;
  text: string;
}

function PersonaLink(props: PersonaLinkProps) {
  const theme = useTheme();
  const nav = useNavigation<StackNav>();

  return (
    <TouchableOpacity
      onPress={() =>
        nav.push("Persona", {
          id: props.id,
          name: props.text,
        })
      }
    >
      <AppText style={{ fontStyle: "italic" }}>
        <AppText>with </AppText>
        <AppText style={{ color: theme.nav.colors.primary }}>
          {props.text}
        </AppText>
      </AppText>
    </TouchableOpacity>
  );
}

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

  const showTitle = showData?.title ?? "";
  const personaName = personaData?.name ?? "";
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
      <View style={{ padding: spacing[12], rowGap: spacing[4] }}>
        {showTitle && (
          <>
            <Headline
              title={showTitle}
              subtitle={
                <>
                  <View>
                    <PersonaLink id={persona_id} text={personaName} />

                    {at && <AppText>{at}</AppText>}

                    {/* {data.episode_description && (
                      <AppHTML
                        contentWidth={width}
                        source={{ html: data.episode_description }}
                      />
                    )} */}
                  </View>
                </>
              }
            />
          </>
        )}
      </View>

      <SpinList useSpinsInput={{ playlist_id: id }} />
    </View>
  );
}

export { PlaylistView };
