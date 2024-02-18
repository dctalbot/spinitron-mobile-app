import { paths } from "./openapi-types";
import { useQueryResource } from "./useQueryResource";

type PersonaQueryInput = paths["/personas/{id}"]["get"]["parameters"]["path"] &
  NonNullable<paths["/personas/{id}"]["get"]["parameters"]["query"]>;

type PersonaQueryData =
  paths["/personas/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

export function usePersona(input: PersonaQueryInput) {
  return useQueryResource<PersonaQueryData>({
    collectionName: "personas",
    input: input,
  });
}
