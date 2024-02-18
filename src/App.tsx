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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
const Tab = createBottomTabNavigator();

const getIcon = (
  name: React.ComponentProps<typeof Ionicons>["name"],
  color: string
) => <Ionicons name={name} size={23} color={color} />;

interface StackNavProps {
  initialRouteName: string;
}

export default function App() {
  const Stack = createNativeStackNavigator();
  const colorScheme = useColorScheme();

  React.useEffect(() => {
    const doAsync = async () => {
      const color = await SystemUI.getBackgroundColorAsync();
      const appearance = Appearance.getColorScheme();

      console.log("color", color);
      console.log("colorScheme", colorScheme);
      console.log("appearance", appearance);
    };

    doAsync();
  }, []);

  const StackNav = (props: StackNavProps) => (
    <Stack.Navigator
      initialRouteName={props.initialRouteName}
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen
        name="Personas"
        component={PersonasView}
        options={{ headerTitle: "DJs" }}
      />
      <Stack.Screen name="Persona" component={PersonaView} />
      <Stack.Screen name="Shows" component={ShowsView} />
      <Stack.Screen name="Show" component={ShowView} />
      <Stack.Screen name="Playlists" component={PlaylistsView} />
      <Stack.Screen name="Playlist" component={PlaylistView} />
      <Stack.Screen
        name="Spins"
        component={SpinsView}
        options={{ headerTitle: "Playlist" }}
      />
      <Stack.Screen name="Spin" component={SpinView} />
    </Stack.Navigator>
  );

  return (
    <ApiClientProvider baseURL={API_BASE_URL}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Schedule"
          screenOptions={{ headerShown: false }}
        >
          <Tab.Screen
            name="ScheduleTab"
            options={{
              tabBarLabel: "Schedule",
              tabBarIcon: ({ color }) => getIcon("calendar", color),
            }}
          >
            {() => <StackNav initialRouteName={"Shows"} />}
          </Tab.Screen>
          <Tab.Screen
            name="SpinsTab"
            options={{
              tabBarLabel: "Playlist",
              tabBarIcon: ({ color }) => getIcon("musical-notes", color),
            }}
          >
            {() => <StackNav initialRouteName={"Spins"} />}
          </Tab.Screen>
          <Tab.Screen
            name="PersonasTab"
            options={{
              tabBarLabel: "DJs",
              tabBarIcon: ({ color }) => getIcon("people-outline", color),
            }}
          >
            {() => <StackNav initialRouteName={"Personas"} />}
          </Tab.Screen>
          {/* <Tab.Screen
            name="PlaylistsTab"
            options={{
              tabBarLabel: "Playlists",
              tabBarIcon: ({ color }) => getIcon("settings-sharp", color),
            }}
          >
            {() => <StackNav initialRouteName={"Playlists"} />}
          </Tab.Screen> */}
        </Tab.Navigator>
      </NavigationContainer>
    </ApiClientProvider>
  );
}
