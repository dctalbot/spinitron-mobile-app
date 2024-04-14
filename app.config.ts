import { ExpoConfig, ConfigContext } from "expo/config";

const extra: AppExtra = {
  api: {
    url: "https://spinitron-proxy.d08jp15rftr3s.us-east-2.cs.amazonlightsail.com/api",
  },
  donate: {
    text: "Give to WCBN",
    url: "https://leadersandbest.umich.edu/find/#!/give/basket/fund/361991",
  },
  phone: {
    text: "Studio request line",
    numberFormatted: "(734) 763-3500",
    numberRaw: "17347633500",
  },
  chat: {
    text: "Message the DJ",
    url: "https://hangouts.google.com/chat/person/118357885959401668528",
  },
  streams: [
    {
      text: "Low",
      bitrate: "64 kbps",
      uri: "http://floyd.wcbn.org:8000/wcbn-mid.mp3",
      default: false,
    },
    {
      text: "Medium",
      bitrate: "128 kbps",
      uri: "http://floyd.wcbn.org:8000/wcbn-hi.mp3",
      default: false,
    },
    {
      text: "High",
      bitrate: "320 kbps",
      uri: "http://floyd.wcbn.org:8000/wcbn-hd.mp3",
      default: true,
    },
  ],
  share: {
    text: "Share on social media",
    message: "I'm listening to WCBN-FM Ann Arbor!",
  },
  review: {
    text: "Write a review!",
  },
  eas: {
    projectId: "f8dd9750-164f-11e9-8b84-313f96953860",
  },
} as const;

export default ({ config: appJSONConfig }: ConfigContext): ExpoConfig => ({
  ...appJSONConfig,
  extra,
  name: "WCBN-FM Ann Arbor",
  description:
    "Discover new music from the student-run radio station of the University of Michigan.",
  slug: "wcbn-app",
  version: "11.0.0",
  ios: {
    ...appJSONConfig.ios,
    bundleIdentifier: "org.wcbn",
  },
  android: {
    ...appJSONConfig.android,
    package: "org.wcbn",
    playStoreUrl: "https://play.google.com/store/apps/details?id=org.wcbn",
  },
  updates: {
    ...appJSONConfig.updates,
    url: "https://u.expo.dev/f8dd9750-164f-11e9-8b84-313f96953860",
  },
});
