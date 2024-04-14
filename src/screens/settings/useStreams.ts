import { useEffect, useState } from "react";
import { config } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const STREAM_INDEX_KEY = "STREAM_INDEX";

export function useStreams() {
  const defaultIndex = Math.max(
    config.streams.findIndex((x) => x.default),
    0,
  );

  const [selectedIndex, setSelectedIndex] = useState<number>(defaultIndex);

  useEffect(() => {
    const doAsync = async () => {
      const stored = await AsyncStorage.getItem(STREAM_INDEX_KEY);
      if (typeof stored === "string") {
        setSelectedIndex(parseInt(stored, 10));
      }
    };
    doAsync();
  }, []);

  const all = config.streams.map((x, i) => ({
    ...x,
    selected: i === selectedIndex,
  }));

  const setStreamAsync = async (index: number) => {
    if (
      index === selectedIndex ||
      index < 0 ||
      index >= config.streams.length
    ) {
      return;
    }
    await AsyncStorage.setItem(STREAM_INDEX_KEY, index.toString());
    setSelectedIndex(index);
  };

  return {
    streams: all,
    selectedIndex,
    setStreamAsync,
  };
}
