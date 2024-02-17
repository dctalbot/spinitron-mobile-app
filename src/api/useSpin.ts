import { useQuery } from "@tanstack/react-query";
import { paths } from "./openapi-types";
import { useBaseURL } from "./ApiProvider";

export type SpinQueryInput = paths["/spins/{id}"]["get"]["parameters"]["path"] &
  NonNullable<paths["/spins/{id}"]["get"]["parameters"]["query"]>;

export type SpinQueryData =
  paths["/spins/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

function useSpin(input: SpinQueryInput) {
  const base = useBaseURL();

  return useQuery<SpinQueryData>({
    queryKey: ["spins", input],
    queryFn: () => fetch(base + "/spins/" + input.id).then((res) => res.json()),
  });
}

export { useSpin };
