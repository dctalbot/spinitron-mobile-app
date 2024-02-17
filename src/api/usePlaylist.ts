import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../config";
import { paths } from "./openapi-types";

export type PlaylistQueryInput =
  paths["/playlists/{id}"]["get"]["parameters"]["path"] &
    NonNullable<paths["/playlists/{id}"]["get"]["parameters"]["query"]>;

export type PlaylistQueryData =
  paths["/playlists/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

function usePlaylist(input: PlaylistQueryInput) {
  return useQuery<PlaylistQueryData>({
    queryKey: ["playlists", input],
    queryFn: () =>
      fetch(API_BASE_URL + "/playlists/" + input.id).then((res) => res.json()),
  });
}

export { usePlaylist };
