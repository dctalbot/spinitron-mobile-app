import { useInfiniteQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../config";

import { paths } from "./openapi-types";

export type SpinsQueryInput = NonNullable<
  paths["/spins"]["get"]["parameters"]["query"]
>;

export type SpinsQueryData =
  paths["/spins"]["get"]["responses"]["200"]["content"]["application/json"];

function useSpins(input?: SpinsQueryInput) {
  const playlist_id = input?.playlist_id ?? "";

  return useInfiniteQuery<SpinsQueryData>({
    queryKey: ["spins", input],
    queryFn: async ({ pageParam }) => {
      const suffix = playlist_id ? `&playlist_id=${playlist_id}` : "";
      return fetch(API_BASE_URL + "/spins?page=" + pageParam + suffix).then(
        (res) => res.json()
      );
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage?._meta?.currentPage ? lastPage?._meta?.currentPage + 1 : null,
  });
}

export { useSpins };
