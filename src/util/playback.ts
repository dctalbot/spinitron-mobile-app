import TrackPlayer, { Event, Capability } from "react-native-track-player";

export const PlaybackService = async function () {
  const capabilities = [Capability.Play, Capability.Pause, Capability.Stop];

  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.stop());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.updateOptions({
    capabilities,
    notificationCapabilities: capabilities,
    compactCapabilities: capabilities,
  });
};
