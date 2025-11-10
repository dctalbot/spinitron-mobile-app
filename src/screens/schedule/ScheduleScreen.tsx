import { View } from "react-native";
import * as React from "react";
import { get } from "lodash-es";
import { DAYS, getToday } from "../../util/time";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ScheduleTab } from "./ScheduleTab";
import { useNavigation } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

export function ScheduleScreen() {
  const nav = useNavigation();
  return (
    <View style={[{ flex: 1 }]}>
      <Tab.Navigator
        initialRouteName={getToday()}
        screenOptions={() => ({
          title: "Schedule",
        })}
        screenListeners={{
          state: (e) => {
            let nextTitle = "Schedule";
            const index = get(e, "data.state.index", null);
            const routeNames = get(e, "data.state.routeNames", []);
            if (index === null || routeNames.length === 0) {
              nextTitle = "Schedule";
            } else {
              nextTitle = routeNames[index];
            }
            nav.setOptions({ title: nextTitle });
          },
        }}
      >
        {DAYS.map((name) => (
          <Tab.Screen
            key={name}
            name={name}
            options={{
              tabBarLabel: name[0],
              lazy: true, // ??
            }}
          >
            {() => <ScheduleTab day={name} />}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
    </View>
  );
}
