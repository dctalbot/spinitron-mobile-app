import { useQuery } from "@tanstack/react-query";
import { paths } from "./openapi-types";
import { useBaseURL } from "./ApiProvider";

export type PersonaQueryInput =
  paths["/personas/{id}"]["get"]["parameters"]["path"] &
    NonNullable<paths["/personas/{id}"]["get"]["parameters"]["query"]>;

export type PersonaQueryData =
  paths["/personas/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

function usePersona(input: PersonaQueryInput) {
  const base = useBaseURL();
  return useQuery<PersonaQueryData>({
    queryKey: ["personas", input],
    queryFn: () =>
      fetch(base + "/personas/" + input.id).then((res) => res.json()),
  });
}

export { usePersona };
