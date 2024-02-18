import { useInfiniteQuery } from "@tanstack/react-query";
import { useBaseURL } from "./ApiProvider";
import { buildQueryString } from "./utils";
import { components } from "./openapi-types";

type BaseIndexResponse = components["schemas"]["BaseIndexResponse"];

interface useQueryCollectionInput {
  collectionName: string;
  input?: Record<string, any>;
}

export function useQueryCollection<TQueryFnData>({
  collectionName,
  input = {},
}: useQueryCollectionInput) {
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
      lastPage?._meta?.currentPage ? lastPage?._meta?.currentPage + 1 : null,
  });
}
