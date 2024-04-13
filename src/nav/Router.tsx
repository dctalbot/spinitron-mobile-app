import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SpinsScreen } from "../screens/spin/SpinsScreen";
import { SpinView } from "../screens/spin/SpinView";
import { PlaylistView } from "../screens/playlist/PlaylistView";
import { PersonaView } from "../screens/persona/PersonaView";
import { ShowScreen } from "../screens/show/ShowScreen";
import { PersonasView } from "../screens/persona/PersonasView";
import { ScheduleScreen } from "../screens/schedule/ScheduleScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SettingsScreen } from "../screens/settings/SettingsScreen";
import { useTheme } from "../theme/useTheme";
import { AppIcon, AppIconProps } from "../ui/AppIcon";
import { RadioScreen } from "../screens/radio/RadioScreen";
import { config } from "../config";
import { spacing } from "../theme/theme";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const tabBarItemStyle = {
  padding: spacing[2],
};

function makeIcon(
  name: AppIconProps["name"],
  tabInfo: { color: string; focused: boolean; size: number },
) {
  const { color, focused, size } = tabInfo;
  const name_ = focused ? name : ((name + "-outline") as AppIconProps["name"]);
  return <AppIcon name={name_} size={size - spacing[2]} color={color} />;
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
      <Stack.Screen name="Show" component={ShowScreen} />
      <Stack.Screen
        name="Radio"
        component={RadioScreen}
        options={{ headerTitle: config.name }}
      />
      <Stack.Screen name="Playlist" component={PlaylistView} options={{}} />
      <Stack.Screen
        name="Spins"
        component={SpinsScreen}
        options={{ headerTitle: "Playlist" }}
      />
      <Stack.Screen name="Spin" component={SpinView} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer theme={theme.nav}>
      <Tab.Navigator
        initialRouteName="RadioTab"
        screenOptions={{ headerShown: false, tabBarItemStyle }}
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
            tabBarLabel: "Playlist",
            tabBarIcon: (x) => makeIcon("musical-notes", x),
          }}
        >
          {() => <StackNav initialRouteName={"Spins"} />}
        </Tab.Screen>
        <Tab.Screen
          name="RadioTab"
          options={{
            tabBarLabel: "Radio",
            tabBarIcon: (x) => makeIcon("radio", x),
          }}
        >
          {() => <StackNav initialRouteName={"Radio"} />}
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
