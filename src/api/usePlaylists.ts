import { useInfiniteQuery } from "@tanstack/react-query";

import { paths } from "./openapi-types";
import { useBaseURL } from "./ApiProvider";

export type PlaylistsQueryInput = NonNullable<
  paths["/playlists"]["get"]["parameters"]["query"]
>;

export type PlaylistsQueryData =
  paths["/playlists"]["get"]["responses"]["200"]["content"]["application/json"];

function usePlaylists(input?: PlaylistsQueryInput) {
  const show_id = input?.show_id ?? "";
  const base = useBaseURL();

  return useInfiniteQuery<PlaylistsQueryData>({
    queryKey: ["playlists", input],
    queryFn: async ({ pageParam }) => {
      const suffix = show_id ? `&show_id=${show_id}` : "";
      return fetch(base + "/playlists?page=" + pageParam + suffix).then((res) =>
        res.json()
      );
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage?._meta?.currentPage ? lastPage?._meta?.currentPage + 1 : null,
  });
}

export { usePlaylists };
