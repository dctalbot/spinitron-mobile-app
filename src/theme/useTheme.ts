import {
  DefaultTheme,
  DarkTheme,
  Theme as NavTheme,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { darkColors, lightColors } from "./theme";

interface Theme {
  colors: typeof lightColors;
  nav: NavTheme;
}

const light: Theme = {
  colors: lightColors,
  nav: { ...DefaultTheme, colors: { ...DefaultTheme.colors, ...lightColors } },
};

const dark: Theme = {
  colors: darkColors,
  nav: { ...DarkTheme, colors: { ...DarkTheme.colors, ...darkColors } },
};

export function useTheme(): Theme {
  const scheme = useColorScheme();
  return scheme === "dark" ? dark : light;
}
