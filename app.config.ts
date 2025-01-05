import fs from "fs";
import path from "path";
import { ExpoConfig, ConfigContext } from "expo/config";
import { VariantConfig } from "./src/types/types";

const APP_VARIANT = process.env.APP_VARIANT || "acme";
const variantDirPath = path.join("variants", APP_VARIANT);
const variantConfigPath = path.join(variantDirPath, "config.json");
const variantAssetsPath = path.join(variantDirPath, "assets");

const extra: VariantConfig = JSON.parse(
  fs.readFileSync(variantConfigPath, "utf8"),
);

export default ({ config: baseConfig }: ConfigContext): ExpoConfig => ({
  ...baseConfig,
  githubUrl: "https://github.com/dctalbot/spinitron-mobile-app",
  orientation: "portrait",
  icon: `${variantAssetsPath}/icon.png`,
  userInterfaceStyle: "automatic",
  splash: {
    image: `${variantAssetsPath}/splash/default.png`,
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
      mdpi: `${variantAssetsPath}/splash/mdpi.png`,
      hdpi: `${variantAssetsPath}/splash/hdpi.png`,
      xhdpi: `${variantAssetsPath}/splash/xhdpi.png`,
      xxhdpi: `${variantAssetsPath}/splash/xxhdpi.png`,
      xxxhdpi: `${variantAssetsPath}/splash/xxxhdpi.png`,
    },
    permissions: [],
    ...extra.android,
  },
  updates: {
    fallbackToCacheTimeout: 0,
    ...extra.updates,
  },
});
