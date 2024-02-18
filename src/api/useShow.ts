import { paths } from "./openapi-types";
import { useQueryResource } from "./useQueryResource";

export type ShowQueryInput = paths["/shows/{id}"]["get"]["parameters"]["path"] &
  NonNullable<paths["/shows/{id}"]["get"]["parameters"]["query"]>;

export type ShowQueryData =
  paths["/shows/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

function useShow(input: ShowQueryInput) {
  return useQueryResource<ShowQueryData>({
    collectionName: "shows",
    input: input,
  });
}

export { useShow };
