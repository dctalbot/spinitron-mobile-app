import { ActivityIndicator, Button, Text, View } from "react-native";
import * as React from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useShow } from "../api/useShow";
import { ShowNav, ShowRoute } from "../nav/types";
import { getPersonaIDs } from "../getPersonaIDs";

function ShowView() {
  const nav = useNavigation<ShowNav>();
  const route = useRoute<ShowRoute>();
  const id = route?.params?.id ?? 0;

  const { isPending, error, data } = useShow({ id });

  if (isPending)
    return (
      <View>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );

  if (error) return <Text>{"An error has occurred: " + error.message}</Text>;

  const personaIDs = getPersonaIDs(data?._links?.personas);

  return (
    <View style={[{ flex: 1 }]}>
      <Text>{data?.id}</Text>
      <Text>{data?.start}</Text>
      <Text>{data?.end}</Text>
      <Text>{data?.duration}</Text>
      <Text>{data?.timezone}</Text>
      <Text>{data?.one_off}</Text>
      <Text>{data?.category}</Text>
      <Text>{data?.title}</Text>
      <Text>{data?.description}</Text>
      <Text>{data?.since}</Text>
      <Text>{data?.url}</Text>
      <Text>{data?.hide_dj}</Text>
      <Text>{data?.image}</Text>

      {personaIDs.map((id, i) => (
        <Button
          key={id}
          title={"Persona " + (i + 1)}
          onPress={() => nav.push("Persona", { id })}
        />
      ))}

      <Button
        title={"playlists for this show"}
        onPress={() => nav.push("Playlists", { show_id: id })}
      />
    </View>
  );
}

export { ShowView };
