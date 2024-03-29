import { useEffect, useState } from "react";
import { config } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const STREAM_INDEX_KEY = "STREAM_INDEX";

export function useStreams() {
  let defaultIndex = config.streams.findIndex((x) => x.default);
  defaultIndex = Math.max(defaultIndex, 0);

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

  const getStreamAsync = async () => {
    let newIndex = defaultIndex;

    const res = await AsyncStorage.getItem(STREAM_INDEX_KEY);
    if (typeof res === "string") {
      newIndex = parseInt(res, 10);
    }

    setSelectedIndex(newIndex);
    return newIndex;
  };

  return {
    streams: all,
    selectedIndex,
    setStreamAsync,
    getStreamAsync,
  };
}
