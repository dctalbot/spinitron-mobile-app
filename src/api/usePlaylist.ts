import { useQuery } from "@tanstack/react-query";
import { paths } from "./openapi-types";
import { useBaseURL } from "./ApiProvider";

export type PlaylistQueryInput =
  paths["/playlists/{id}"]["get"]["parameters"]["path"] &
    NonNullable<paths["/playlists/{id}"]["get"]["parameters"]["query"]>;

export type PlaylistQueryData =
  paths["/playlists/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

function usePlaylist(input: PlaylistQueryInput) {
  const base = useBaseURL();
  return useQuery<PlaylistQueryData>({
    queryKey: ["playlists", input],
    queryFn: () =>
      fetch(base + "/playlists/" + input.id).then((res) => res.json()),
  });
}

export { usePlaylist };
