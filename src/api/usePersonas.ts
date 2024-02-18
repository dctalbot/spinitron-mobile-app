import { paths } from "./openapi-types";
import { useQueryCollection } from "./useQueryCollection";

export type PersonasQueryInput = NonNullable<
  paths["/personas"]["get"]["parameters"]["query"]
>;

export type PersonasQueryData =
  paths["/personas"]["get"]["responses"]["200"]["content"]["application/json"];

function usePersonas(input?: PersonasQueryInput) {
  return useQueryCollection<PersonasQueryData>({
    collectionName: "personas",
    input: input,
  });
}

export { usePersonas };
