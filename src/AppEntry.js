import { registerRootComponent } from "expo";
import TrackPlayer from "react-native-track-player";
import { PlaybackService } from "./util/playback";
import App from "./App";

registerRootComponent(App);

TrackPlayer.registerPlaybackService(() => PlaybackService);
TrackPlayer.setupPlayer(); // async
