import { paths } from "./openapi-types";
import { UseQueryResourceOptions, useQueryResource } from "./useQueryResource";

type ShowQueryInput = paths["/shows/{id}"]["get"]["parameters"]["path"] &
  NonNullable<paths["/shows/{id}"]["get"]["parameters"]["query"]>;

type ShowQueryData =
  paths["/shows/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

export function useShow(
  input: ShowQueryInput,
  opts?: UseQueryResourceOptions<ShowQueryData>,
) {
  return useQueryResource<ShowQueryData>(
    {
      collectionName: "shows",
      input: input,
    },
    opts,
  );
}
