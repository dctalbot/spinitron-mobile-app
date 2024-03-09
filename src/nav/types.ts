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

export type StackNav = NavProp<StackParamList, keyof StackParamList>;
export type StackRoute<T extends keyof StackParamList> = RouteProp<
  StackParamList,
  T
>;
