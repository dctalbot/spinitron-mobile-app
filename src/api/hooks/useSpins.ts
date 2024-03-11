import { paths } from "../openapi-types";
import { useQueryCollection } from "./useQueryCollection";

type SpinsQueryInput = NonNullable<
  paths["/spins"]["get"]["parameters"]["query"]
>;

type SpinsQueryData =
  paths["/spins"]["get"]["responses"]["200"]["content"]["application/json"];

export function useSpins(input?: SpinsQueryInput) {
  return useQueryCollection<SpinsQueryData>({
    collectionName: "spins",
    input: input,
  });
}
