import { paths } from "./openapi-types";
import { useQueryCollection } from "./useQueryCollection";

export type PlaylistsQueryInput = NonNullable<
  paths["/playlists"]["get"]["parameters"]["query"]
>;

export type PlaylistsQueryData =
  paths["/playlists"]["get"]["responses"]["200"]["content"]["application/json"];

function usePlaylists(input?: PlaylistsQueryInput) {
  return useQueryCollection<PlaylistsQueryData>({
    collectionName: "playlists",
    input: input,
  });
}

export { usePlaylists };
