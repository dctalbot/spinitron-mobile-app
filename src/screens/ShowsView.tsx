import { View } from "react-native";
import * as React from "react";
import * as _ from "lodash-es";
import { DAYS, Day, getToday } from "../util/time";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ScheduleTab } from "./schedule/ScheduleTab";
import { useNavigation } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

function ShowsView() {
  const nav = useNavigation();
  return (
    <View style={[{ flex: 1 }]}>
      <Tab.Navigator
        initialRouteName={getToday()}
        screenOptions={({ route }) => ({
          title: "foo",
        })}
        screenListeners={{
          state: (e) => {
            let nextTitle = "Schedule";
            const index = _.get(e, "data.state.index", null);
            const routeNames: Day[] = _.get(e, "data.state.routeNames", []);
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
              lazy: false, // ??
            }}
          >
            {() => <ScheduleTab day={name} />}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
    </View>
  );
}

export { ShowsView };
