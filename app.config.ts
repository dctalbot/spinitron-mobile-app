import fs from "fs";
import path from "path";
import { ExpoConfig, ConfigContext } from "expo/config";
import { VariantConfig } from "./src/types/types";

if (!process.env.VARIANT_DIRNAME) {
  throw new Error("VARIANT_DIRNAME not set");
}

const customConfigPath = path.join(
  "variants",
  process.env.VARIANT_DIRNAME,
  "config.json",
);

const extra: VariantConfig = JSON.parse(
  fs.readFileSync(customConfigPath, "utf8"),
);

export default ({ config: baseConfig }: ConfigContext): ExpoConfig => ({
  ...baseConfig,
  githubUrl: "https://github.com/dctalbot/spinitron-mobile-app",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/splash/default.png",
    resizeMode: "contain",
    backgroundColor: "#212733",
  },
  assetBundlePatterns: ["**/*"],
  platforms: ["android", "ios"],
  runtimeVersion: { policy: "appVersion" },
  plugins: [
    [
      "expo-build-properties",
      {
        android: {
          usesCleartextTraffic: true,
        },
      },
    ],
  ],
  extra,
  name: extra.name,
  description: extra.description,
  slug: extra.slug,
  version: "52.0.0",
  ios: {
    supportsTablet: true,
    infoPlist: { UIBackgroundModes: ["audio"] },
    ...extra.ios,
  },
  android: {
    splash: {
      backgroundColor: "#212733",
      resizeMode: "contain",
      mdpi: "./assets/splash/mdpi.png",
      hdpi: "./assets/splash/hdpi.png",
      xhdpi: "./assets/splash/xhdpi.png",
      xxhdpi: "./assets/splash/xxhdpi.png",
      xxxhdpi: "./assets/splash/xxxhdpi.png",
    },
    permissions: [],
    ...extra.android,
  },
  updates: {
    fallbackToCacheTimeout: 0,
    ...extra.updates,
  },
});
