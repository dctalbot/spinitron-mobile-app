import * as React from "react";
import { ApiClientProvider } from "@dctalbot/react-spinitron";
import NetInfo from "@react-native-community/netinfo";
import { config } from "./config";
import { Router } from "./nav/Router";
import { StatusBar } from "expo-status-bar";
import "expo-dev-client";
import TrackPlayer from "react-native-track-player";
import { PlaybackService } from "./util/playback";

TrackPlayer.registerPlaybackService(() => PlaybackService);
TrackPlayer.setupPlayer(); // async

export default function App() {
  return (
    <ApiClientProvider
      baseURL={config.api.url}
      onlineEventListener={(setOnline) => {
        return NetInfo.addEventListener((state) => {
          setOnline(!!state.isConnected);
        });
      }}
    >
      <StatusBar style="auto" />
      <Router />
    </ApiClientProvider>
  );
}
