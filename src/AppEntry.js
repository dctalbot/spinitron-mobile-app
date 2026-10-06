import { registerRootComponent } from "expo";
import { registerPlaybackSession } from "./util/playback";
import App from "./App";

registerPlaybackSession();
registerRootComponent(App);
