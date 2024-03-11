import { paths } from "../openapi-types";
import { useQueryCollection } from "./useQueryCollection";

type PlaylistsQueryInput = NonNullable<
  paths["/playlists"]["get"]["parameters"]["query"]
>;

type PlaylistsQueryData =
  paths["/playlists"]["get"]["responses"]["200"]["content"]["application/json"];

export function usePlaylists(input?: PlaylistsQueryInput) {
  return useQueryCollection<PlaylistsQueryData>({
    collectionName: "playlists",
    input: input,
  });
}
