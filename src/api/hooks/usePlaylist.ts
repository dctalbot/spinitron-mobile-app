import { paths } from "../openapi-types";
import { UseQueryResourceOptions, useQueryResource } from "./useQueryResource";

type PlaylistQueryInput =
  paths["/playlists/{id}"]["get"]["parameters"]["path"] &
    NonNullable<paths["/playlists/{id}"]["get"]["parameters"]["query"]>;

type PlaylistQueryData =
  paths["/playlists/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

export function usePlaylist(
  input: PlaylistQueryInput,
  opts?: UseQueryResourceOptions<PlaylistQueryData>,
) {
  return useQueryResource<PlaylistQueryData>(
    {
      collectionName: "playlists",
      input: input,
    },
    opts,
  );
}
