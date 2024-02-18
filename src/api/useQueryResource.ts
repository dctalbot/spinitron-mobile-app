import { useQuery } from "@tanstack/react-query";
import { useBaseURL } from "./ApiProvider";
import { buildQueryString } from "./utils";

type QueryResourceInput = Record<string, unknown> & { id: number | string };

interface useQueryResourceInput {
  collectionName: string;
  input: QueryResourceInput;
}

export function useQueryResource<TQueryFnData>({
  collectionName,
  input,
}: useQueryResourceInput) {
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
  });
}
