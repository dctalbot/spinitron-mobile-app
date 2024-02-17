import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../config";
import { paths } from "./openapi-types";

export type ShowQueryInput = paths["/shows/{id}"]["get"]["parameters"]["path"] &
  NonNullable<paths["/shows/{id}"]["get"]["parameters"]["query"]>;

export type ShowQueryData =
  paths["/shows/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

function useShow(input: ShowQueryInput) {
  return useQuery<ShowQueryData>({
    queryKey: ["shows", input],
    queryFn: () =>
      fetch(API_BASE_URL + "/shows/" + input.id).then((res) => res.json()),
  });
}

export { useShow };
