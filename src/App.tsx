import * as React from "react";
import * as SystemUI from "expo-system-ui";
import { Appearance, useColorScheme } from "react-native";
import { ApiClientProvider } from "./api/ApiProvider";
import { API_BASE_URL } from "../config";
import { Router } from "./nav/Router";

export default function App() {
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

  return (
    <ApiClientProvider baseURL={API_BASE_URL}>
      <Router />
    </ApiClientProvider>
  );
}
