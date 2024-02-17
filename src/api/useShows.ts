import { useInfiniteQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../config";
import { paths } from "./openapi-types";

export type ShowsQueryInput = NonNullable<
  paths["/shows"]["get"]["parameters"]["query"]
>;

export type ShowsQueryData =
  paths["/shows"]["get"]["responses"]["200"]["content"]["application/json"];

function useShows(input?: ShowsQueryInput) {
  return useInfiniteQuery<ShowsQueryData>({
    queryKey: ["shows"],
    queryFn: async ({ pageParam }) => {
      return fetch(API_BASE_URL + "/shows?page=" + pageParam).then((res) =>
        res.json()
      );
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage?._meta?.currentPage ? lastPage?._meta?.currentPage + 1 : null,
  });
}

export { useShows };
