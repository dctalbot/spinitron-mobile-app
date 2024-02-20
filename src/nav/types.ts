import { NativeStackNavigationProp as NavProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type StackParamList = {
  Personas: undefined;
  Persona: { id?: number; name?: string };
  Shows: undefined;
  Show: { id?: number; title?: string };
  Playlists: { show_id?: number };
  Playlist: { id?: number };
  Spins: { playlist_id?: number };
  Spin: { id?: number; song?: string };
};

// all personas
export type PersonasNav = NavProp<StackParamList, "Personas">;

// single persona
export type PersonaRoute = RouteProp<StackParamList, "Persona">;

// all shows
export type ShowsNav = NavProp<StackParamList, "Shows">;

export type ShowsRoute = RouteProp<StackParamList, "Shows">;

// single show
export type ShowNav = NavProp<StackParamList, "Show">;

export type ShowRoute = RouteProp<StackParamList, "Show">;

// all spins
export type SpinsNav = NavProp<StackParamList, "Spins">;

export type SpinsRoute = RouteProp<StackParamList, "Spins">;

// single spin
export type SpinNav = NavProp<StackParamList, "Spin">;

export type SpinRoute = RouteProp<StackParamList, "Spin">;

// all playlists
export type PlaylistsNav = NavProp<StackParamList, "Playlists">;

export type PlaylistsRoute = RouteProp<StackParamList, "Playlists">;

// single playlist
export type PlaylistNav = NavProp<StackParamList, "Playlist">;

export type PlaylistRoute = RouteProp<StackParamList, "Playlist">;

// arbitrary page
export type StackNav = NavProp<StackParamList, keyof StackParamList>;
