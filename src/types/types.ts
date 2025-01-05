import { ExpoConfig } from "expo/config";

export interface VariantConfig extends Record<string, unknown> {
  api: {
    url: string;
  };
  donate?: {
    text: string;
    url: string;
  };
  phone?: {
    text: string;
    numberFormatted: string;
    numberRaw: string;
  };
  chat?: {
    text: string;
    url: string;
  };
  share?: {
    text: string;
    message: string;
  };
  streams: {
    text: string;
    uri: string;
    default: boolean;
    bitrate?: string;
  }[];
  review?: {
    text: string;
  };
  name: string;
  description: string;
  slug: string;
  ios: Partial<ExpoConfig["ios"]>;
  android: Partial<ExpoConfig["android"]>;
  updates: Partial<ExpoConfig["updates"]>;
}
