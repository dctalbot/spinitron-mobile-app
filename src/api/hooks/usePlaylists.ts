import { paths } from "../openapi-types";
import {
  UseQueryCollectionOptions,
  useQueryCollection,
} from "./useQueryCollection";

type PlaylistsQueryInput = NonNullable<
  paths["/playlists"]["get"]["parameters"]["query"]
>;

type PlaylistsQueryData =
  paths["/playlists"]["get"]["responses"]["200"]["content"]["application/json"];

export function usePlaylists(
  input?: PlaylistsQueryInput,
  opts?: UseQueryCollectionOptions<PlaylistsQueryData>,
) {
  return useQueryCollection<PlaylistsQueryData>(
    {
      collectionName: "playlists",
      input: input,
    },
    opts,
  );
}
