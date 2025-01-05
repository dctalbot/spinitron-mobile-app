import { ExpoConfig, ConfigContext } from "expo/config";

const extra: AppExtra = {
  api: {
    url: "https://example.com/api",
  },
  donate: {
    text: "Give to ACME",
    url: "https://example.com/donate",
  },
  phone: {
    text: "Studio request line",
    numberFormatted: "(123) 123-4567",
    numberRaw: "11231234567",
  },
  chat: {
    text: "Message the DJ",
    url: "https://example.com/chat",
  },
  streams: [
    {
      text: "Main",
      bitrate: "64 kbps",
      uri: "http://floyd.ACME.org:8000/ACME-mid.mp3",
      default: true,
    },
  ],
  share: {
    text: "Share on social media",
    message: "I'm listening to ACME-FM Footown!",
  },
  review: {
    text: "Write a review!",
  },
  eas: {
    projectId: "96a993b3-61f9-42ea-b28b-8497496702fc",
  },
} as const;

export default ({ config: appJSONConfig }: ConfigContext): ExpoConfig => ({
  ...appJSONConfig,
  extra,
  name: "ACME-FM Footown",
  description: "Discover new music from acme.",
  slug: "ACME-app",
  version: "52.0.0",
  ios: {
    ...appJSONConfig.ios,
    bundleIdentifier: "org.ACME",
  },
  android: {
    ...appJSONConfig.android,
    package: "org.ACME",
    playStoreUrl: "https://play.google.com/store/apps/details?id=org.ACME",
  },
  updates: {
    ...appJSONConfig.updates,
    url: "https://u.expo.dev/96a993b3-61f9-42ea-b28b-8497496702fc",
  },
});
