import { useInfiniteQuery } from "@tanstack/react-query";
import { useBaseURL } from "../provider/ApiProvider";
import { buildQueryString } from "../util/buildQueryString";
import { components } from "../openapi-types";

type BaseIndexResponse = components["schemas"]["BaseIndexResponse"];

type UseInfiniteQueryOptions<T> = Parameters<typeof useInfiniteQuery<T>>[0];

interface useQueryCollectionInput {
  collectionName: string;
  input?: Record<string, unknown>;
}

export type UseQueryCollectionOptions<T> = T &
  Partial<UseInfiniteQueryOptions<T>>;

export function useQueryCollection<TQueryFnData>(
  { collectionName, input = {} }: useQueryCollectionInput,
  opts?: UseQueryCollectionOptions<TQueryFnData & BaseIndexResponse>,
) {
  const base = useBaseURL();
  const s = buildQueryString(input);

  return useInfiniteQuery<TQueryFnData & BaseIndexResponse>({
    queryKey: [collectionName, input],
    queryFn: async ({ pageParam }) => {
      let url = `${base}/${collectionName}?page=${pageParam}`;
      if (s) {
        url += "&" + s;
      }
      return fetch(url).then((res) => res.json());
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage?._meta?.currentPage === lastPage._meta?.pageCount
        ? null
        : (lastPage?._meta?.currentPage ?? 0) + 1,
    ...opts,
  });
}
