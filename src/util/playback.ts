import TrackPlayer, { PlayerCommand } from "@rntp/player";

export function registerPlaybackSession() {
  TrackPlayer.registerPlaybackSession(() => {
    TrackPlayer.setupPlayer({
      contentType: "music",
      handleAudioBecomingNoisy: true,
      android: { wakeMode: "network" },
    });
    TrackPlayer.setCommands({
      capabilities: [PlayerCommand.PlayPause, PlayerCommand.Stop],
    });
  });
}
