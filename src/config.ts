import Constants from "expo-constants";
import { VariantConfig } from "./types/types";

export const config: VariantConfig = Constants.expoConfig
  ?.extra as VariantConfig;
