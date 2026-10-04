import { useEffect } from "react";
import { useStreams } from "../settings/useStreams";
import Constants from "expo-constants";
import TrackPlayer, { PlaybackState, useIsPlaying, usePlaybackState } from "@rntp/player";

export interface Radio {
  play: () => Promise<void>;
  stop: () => Promise<void>;
  ui: "play" | "stop" | "spin";
}

export function useRadio(): Radio {
  const { streams, selectedIndex } = useStreams();
  const playing = useIsPlaying();
  const playbackState = usePlaybackState();

  let ui: Radio["ui"] = "play";
  if (playbackState === PlaybackState.Buffering) {
    ui = "spin";
  } else if (playing) {
    ui = "stop";
  }

  useEffect(() => {
    return () => {
      TrackPlayer.stop();
      TrackPlayer.clear();
    };
  }, []);

  const stop = async () => {
    TrackPlayer.stop();
    TrackPlayer.clear();
  };

  const play = async () => {
    TrackPlayer.setMediaItem({
      mediaId: String(selectedIndex),
      url: streams[selectedIndex].uri,
      title: Constants.expoConfig?.name,
      isLive: true,
    });
    TrackPlayer.play();
  };

  return {
    play,
    stop,
    ui,
  };
}
