import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../config";
import { paths } from "./openapi-types";

export type SpinQueryInput = paths["/spins/{id}"]["get"]["parameters"]["path"] &
  NonNullable<paths["/spins/{id}"]["get"]["parameters"]["query"]>;

export type SpinQueryData =
  paths["/spins/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

function useSpin(input: SpinQueryInput) {
  return useQuery<SpinQueryData>({
    queryKey: ["spins", input],
    queryFn: () =>
      fetch(API_BASE_URL + "/spins/" + input.id).then((res) => res.json()),
  });
}

export { useSpin };
