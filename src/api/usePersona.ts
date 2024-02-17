import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../config";
import { paths } from "./openapi-types";

export type PersonaQueryInput =
  paths["/personas/{id}"]["get"]["parameters"]["path"] &
    NonNullable<paths["/personas/{id}"]["get"]["parameters"]["query"]>;

export type PersonaQueryData =
  paths["/personas/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

function usePersona(input: PersonaQueryInput) {
  return useQuery<PersonaQueryData>({
    queryKey: ["personas", input.id],
    queryFn: () =>
      fetch(API_BASE_URL + "/personas/" + input.id).then((res) => res.json()),
  });
}

export { usePersona };
