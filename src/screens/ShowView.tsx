import { ActivityIndicator, Text, View } from "react-native";
import * as React from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useShow } from "../api/useShow";
import { StackNav, StackRoute } from "../nav/types";
import { getResourceID } from "../api/getResourceID";
import { PersonaPreview } from "../components/PersonaPreview";
import { PlaylistList } from "../components/PlaylistList";
import { Headline } from "../components/Headline";

function ShowView() {
  const nav = useNavigation<StackNav>();
  const route = useRoute<StackRoute<"Show">>();
  const id = route?.params?.id ?? 0;
  const title = route?.params?.title ?? "";

  const { isPending, error, data } = useShow({ id });

  React.useEffect(() => {
    if (title) {
      nav.setOptions({ title });
    }
  }, [title]);

  if (isPending)
    return (
      <View>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );

  if (error) return <Text>{"An error has occurred: " + error.message}</Text>;

  const personaIDs = (data?._links?.personas ?? [])
    .map((p) => p.href as string) // typecast because next line has filter
    .filter(Boolean)
    .map(getResourceID);

  return (
    <View style={[{ flex: 1 }]}>
      <Headline
        title={data.title ?? ""}
        subtitle={
          <View>
            <Text>{data?.category}</Text>
            <Text>{data?.description}</Text>
            <Text>{data?.url}</Text>
          </View>
        }
      />

      <Text>Host:</Text>
      {personaIDs.map((id) => (
        <PersonaPreview key={id} id={id} />
      ))}

      <Text>Episodes:</Text>
      <PlaylistList queryInput={{ show_id: id }} />
    </View>
  );
}

export { ShowView };
