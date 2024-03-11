import { useQuery } from "@tanstack/react-query";
import { useBaseURL } from "../provider/ApiProvider";
import { buildQueryString } from "../util/buildQueryString";

type QueryResourceInput = Record<string, unknown> & { id: number | string };

type UseQueryOptions<T> = Parameters<typeof useQuery<T>>[0];

type useQueryResourceInput = {
  collectionName: string;
  input: QueryResourceInput;
};

export type UseQueryResourceOptions<T> = T & Partial<UseQueryOptions<T>>;

export function useQueryResource<TQueryFnData>(
  { collectionName, input }: useQueryResourceInput,
  opts?: UseQueryResourceOptions<TQueryFnData>,
) {
  const base = useBaseURL();
  const s = buildQueryString(input);

  return useQuery<TQueryFnData>({
    queryKey: [collectionName, input],
    queryFn: async () => {
      let url = `${base}/${collectionName}/${input.id}`;
      if (s) {
        url += "?" + s;
      }
      return fetch(url).then((res) => res.json());
    },
    ...opts,
  });
}
