import { useEffect } from "react";
import { useStreams } from "../settings/useStreams";
import Constants from "expo-constants";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";

export interface Radio {
  play: () => Promise<void>;
  stop: () => Promise<void>;
  ui: "play" | "stop" | "spin";
}

export function useRadio(): Radio {
  const { streams, selectedIndex } = useStreams();
  const isPlaying = useIsPlaying();
  let ui: Radio["ui"] = "spin";

  if (isPlaying.bufferingDuringPlay === true) {
    ui = "spin";
  } else if (isPlaying.playing === true) {
    ui = "stop";
  } else if (isPlaying.playing === false) {
    ui = "play";
  }

  useEffect(() => {
    return () => {
      TrackPlayer.reset();
    };
  }, []);

  const stop = async () => {
    await TrackPlayer.reset();
  };

  const play = async () => {
    await stop();

    await TrackPlayer.add([
      {
        id: selectedIndex,
        url: streams[selectedIndex].uri,
        title: Constants.expoConfig?.name,
        isLiveStream: true,
      },
    ]);

    await TrackPlayer.play();
  };

  return {
    play,
    stop,
    ui,
  };
}
