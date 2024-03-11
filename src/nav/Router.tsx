import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SpinsView } from "../screens/SpinsView";
import { SpinView } from "../screens/SpinView";
import { PlaylistView } from "../screens/playlist/PlaylistView";
import { PersonaView } from "../screens/PersonaView";
import { ShowView } from "../screens/ShowView";
import { PlaylistsView } from "../screens/PlaylistsView";
import { PersonasView } from "../screens/PersonasView";
import { ScheduleScreen } from "../screens/schedule/ScheduleScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SettingsView } from "../screens/Settings";
import { useTheme } from "../theme/useTheme";
import { AppIcon, AppIconProps } from "../ui/AppIcon";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function makeIcon(
  name: AppIconProps["name"],
  tabInfo: { color: string; focused: boolean; size: number },
) {
  const { color, focused, size } = tabInfo;
  const name_ = focused ? name : ((name + "-outline") as AppIconProps["name"]);
  return <AppIcon name={name_} size={size} color={color} />;
}

interface StackNavProps {
  initialRouteName: string;
}

export function Router() {
  const theme = useTheme();

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
      <Stack.Screen
        name="Persona"
        component={PersonaView}
        options={{ headerTitle: undefined }}
      />
      <Stack.Screen name="Shows" component={ScheduleScreen} />
      <Stack.Screen name="Show" component={ShowView} />
      <Stack.Screen name="Playlists" component={PlaylistsView} />
      <Stack.Screen name="Playlist" component={PlaylistView} options={{}} />
      <Stack.Screen
        name="Spins"
        component={SpinsView}
        options={{ headerTitle: "On Air" }}
      />
      <Stack.Screen name="Spin" component={SpinView} />
      <Stack.Screen name="Settings" component={SettingsView} />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer theme={theme.nav}>
      <Tab.Navigator
        initialRouteName="Schedule"
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name="ScheduleTab"
          options={{
            tabBarLabel: "Schedule",
            tabBarIcon: (x) => makeIcon("calendar", x),
          }}
        >
          {() => <StackNav initialRouteName={"Shows"} />}
        </Tab.Screen>
        <Tab.Screen
          name="SpinsTab"
          options={{
            tabBarLabel: "On Air",
            tabBarIcon: (x) => makeIcon("musical-notes", x),
          }}
        >
          {() => <StackNav initialRouteName={"Spins"} />}
        </Tab.Screen>
        <Tab.Screen
          name="PersonasTab"
          options={{
            tabBarLabel: "DJs",
            tabBarIcon: (x) => makeIcon("people", x),
          }}
        >
          {() => <StackNav initialRouteName={"Personas"} />}
        </Tab.Screen>
        <Tab.Screen
          name="SettingsTab"
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: (x) => makeIcon("settings", x),
          }}
        >
          {() => <StackNav initialRouteName={"Settings"} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
