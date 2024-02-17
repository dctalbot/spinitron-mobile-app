import { useQuery } from "@tanstack/react-query";
import { paths } from "./openapi-types";
import { useBaseURL } from "./ApiProvider";

export type ShowQueryInput = paths["/shows/{id}"]["get"]["parameters"]["path"] &
  NonNullable<paths["/shows/{id}"]["get"]["parameters"]["query"]>;

export type ShowQueryData =
  paths["/shows/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

function useShow(input: ShowQueryInput) {
  const base = useBaseURL();
  return useQuery<ShowQueryData>({
    queryKey: ["shows", input],
    queryFn: () => fetch(base + "/shows/" + input.id).then((res) => res.json()),
  });
}

export { useShow };
