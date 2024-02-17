import { useInfiniteQuery } from "@tanstack/react-query";
import { paths } from "./openapi-types";
import { useBaseURL } from "./ApiProvider";

export type ShowsQueryInput = NonNullable<
  paths["/shows"]["get"]["parameters"]["query"]
>;

export type ShowsQueryData =
  paths["/shows"]["get"]["responses"]["200"]["content"]["application/json"];

function useShows(input?: ShowsQueryInput) {
  const base = useBaseURL();

  return useInfiniteQuery<ShowsQueryData>({
    queryKey: ["shows"],
    queryFn: async ({ pageParam }) => {
      return fetch(base + "/shows?page=" + pageParam).then((res) => res.json());
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage?._meta?.currentPage ? lastPage?._meta?.currentPage + 1 : null,
  });
}

export { useShows };
