import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SystemUI from "expo-system-ui";
import { Appearance, useColorScheme } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SpinsView } from "./SpinsView";
import { SpinView } from "./SpinView";
import { PlaylistView } from "./PlaylistView";
import { PersonaView } from "./PersonaView";
import { ShowView } from "./ShowView";

const queryClient = new QueryClient();

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

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
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Spins" component={SpinsView} />
          <Stack.Screen name="Spin" component={SpinView} />
          <Stack.Screen name="Playlist" component={PlaylistView} />
          <Stack.Screen name="Persona" component={PersonaView} />
          <Stack.Screen name="Show" component={ShowView} />
          <Stack.Screen name="SpinsForPlaylist" component={SpinsView} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
