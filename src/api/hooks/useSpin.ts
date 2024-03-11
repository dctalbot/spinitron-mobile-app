import { paths } from "../openapi-types";
import { UseQueryResourceOptions, useQueryResource } from "./useQueryResource";

type SpinQueryInput = paths["/spins/{id}"]["get"]["parameters"]["path"] &
  NonNullable<paths["/spins/{id}"]["get"]["parameters"]["query"]>;

export type SpinQueryData =
  paths["/spins/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

export function useSpin(
  input: SpinQueryInput,
  opts?: UseQueryResourceOptions<SpinQueryData>,
) {
  return useQueryResource<SpinQueryData>(
    {
      collectionName: "spins",
      input: input,
    },
    opts,
  );
}
