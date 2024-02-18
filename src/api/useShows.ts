import { useInfiniteQuery } from "@tanstack/react-query";
import { paths } from "./openapi-types";
import { useBaseURL } from "./ApiProvider";
import { buildQueryString } from "./utils";

export type ShowsQueryInput = NonNullable<
  paths["/shows"]["get"]["parameters"]["query"]
>;

export type ShowsQueryData =
  paths["/shows"]["get"]["responses"]["200"]["content"]["application/json"];

function useShows(input: ShowsQueryInput = {}) {
  const base = useBaseURL();
  const s = buildQueryString(input);

  return useInfiniteQuery<ShowsQueryData>({
    queryKey: ["shows", input],
    queryFn: async ({ pageParam }) => {
      let url = `${base}/shows?page=${pageParam}`;
      if (s) {
        url += "&" + s;
      }
      return fetch(url).then((res) => res.json());
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage?._meta?.currentPage ? lastPage?._meta?.currentPage + 1 : null,
  });
}

export { useShows };
