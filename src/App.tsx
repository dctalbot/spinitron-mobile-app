import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SystemUI from "expo-system-ui";
import { Appearance, useColorScheme } from "react-native";
import { SpinsView } from "./screens/SpinsView";
import { SpinView } from "./screens/SpinView";
import { PlaylistView } from "./screens/PlaylistView";
import { PersonaView } from "./screens/PersonaView";
import { ShowView } from "./screens/ShowView";
import { PlaylistsView } from "./screens/PlaylistsView";
import { PersonasView } from "./screens/PersonasView";
import { ShowsView } from "./screens/ShowsView";
import { ApiClientProvider } from "./api/ApiProvider";
import { API_BASE_URL } from "../config";

export default function App() {
  const Stack = createNativeStackNavigator();
  let colorScheme = useColorScheme();

  React.useEffect(() => {
    const doAsync = async () => {
      const color = await SystemUI.getBackgroundColorAsync();
      let appearance = Appearance.getColorScheme();

      console.log("color", color);
      console.log("colorScheme", colorScheme);
      console.log("appearance", appearance);
    };

    doAsync();
  }, []);

  return (
    <ApiClientProvider baseURL={API_BASE_URL}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="Spins">
          <Stack.Screen name="Personas" component={PersonasView} />
          <Stack.Screen name="Persona" component={PersonaView} />
          <Stack.Screen name="Shows" component={ShowsView} />
          <Stack.Screen name="Show" component={ShowView} />
          <Stack.Screen name="Playlists" component={PlaylistsView} />
          <Stack.Screen name="Playlist" component={PlaylistView} />
          <Stack.Screen name="Spins" component={SpinsView} />
          <Stack.Screen name="Spin" component={SpinView} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApiClientProvider>
  );
}
