import { useInfiniteQuery } from "@tanstack/react-query";
import { paths } from "./openapi-types";
import { useBaseURL } from "./ApiProvider";

export type PersonasQueryInput = NonNullable<
  paths["/personas"]["get"]["parameters"]["query"]
>;

export type PersonasQueryData =
  paths["/personas"]["get"]["responses"]["200"]["content"]["application/json"];

function usePersonas(_input?: PersonasQueryInput) {
  const base = useBaseURL();
  return useInfiniteQuery<PersonasQueryData>({
    queryKey: ["personas"],
    queryFn: async ({ pageParam }) => {
      return fetch(base + "/personas?page=" + pageParam).then((res) =>
        res.json()
      );
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage?._meta?.currentPage ? lastPage?._meta?.currentPage + 1 : null,
  });
}

export { usePersonas };
