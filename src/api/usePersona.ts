import { paths } from "./openapi-types";
import { useQueryResource } from "./useQueryResource";

export type PersonaQueryInput =
  paths["/personas/{id}"]["get"]["parameters"]["path"] &
    NonNullable<paths["/personas/{id}"]["get"]["parameters"]["query"]>;

export type PersonaQueryData =
  paths["/personas/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

function usePersona(input: PersonaQueryInput) {
  return useQueryResource<PersonaQueryData>({
    collectionName: "personas",
    input: input,
  });
}

export { usePersona };
