import {
  AVPlaybackStatus,
  Audio,
  InterruptionModeAndroid,
  InterruptionModeIOS,
} from "expo-av";
import { useEffect, useRef } from "react";
import { SoundObject } from "expo-av/build/Audio";
import React from "react";
import { useStreams } from "../settings/useStreams";

export interface Radio {
  play: () => Promise<void>;
  stop: () => Promise<void>;
  isPlaying: boolean;
  isBuffering: boolean;
  isLoading: boolean;
  isUnloading: boolean;
  isLoaded: boolean;
}

export function useRadio(): Radio {
  const { streams, getStreamAsync } = useStreams();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isBuffering, setIsBuffering] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isUnloading, setIsUnloading] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const sound = useRef<SoundObject | null>(null);

  useEffect(() => {
    const doAsync = async () => {
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        allowsRecordingIOS: false,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        playThroughEarpieceAndroid: false,
        shouldDuckAndroid: true,
      });
    };

    doAsync();

    return () => {
      sound.current?.sound?.unloadAsync();
    };
  }, []);

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
      setIsBuffering(status.isBuffering);
      setIsLoaded(status.isLoaded);
    }
  };

  const stop = async () => {
    setIsUnloading(true);
    await sound.current?.sound.unloadAsync();
    setIsUnloading(false);
    setIsLoaded(false);
    setIsPlaying(false);
    setIsLoading(false);
    setIsBuffering(false);
  };

  const play = async () => {
    if (isPlaying) {
      return Promise.resolve();
    }
    await stop();

    setIsLoading(true);

    const index = await getStreamAsync();
    const uri = streams[index].uri;

    sound.current = await Audio.Sound.createAsync(
      {
        headers: {
          "X-client-type": "mobile-app",
        },
        uri,
      },
      { shouldPlay: true },
      onPlaybackStatusUpdate,
      false,
    );

    setIsLoading(false);
    setIsLoaded(true);

    await sound.current.sound.playAsync();
  };

  return {
    play,
    stop,
    isPlaying,
    isBuffering,
    isLoading,
    isUnloading,
    isLoaded,
  };
}
