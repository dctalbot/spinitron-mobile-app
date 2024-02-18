import { paths } from "./openapi-types";
import { useQueryResource } from "./useQueryResource";

export type SpinQueryInput = paths["/spins/{id}"]["get"]["parameters"]["path"] &
  NonNullable<paths["/spins/{id}"]["get"]["parameters"]["query"]>;

export type SpinQueryData =
  paths["/spins/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

function useSpin(input: SpinQueryInput) {
  return useQueryResource<SpinQueryData>({
    collectionName: "spins",
    input: input,
  });
}

export { useSpin };
