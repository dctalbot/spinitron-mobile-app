import { paths } from "./openapi-types";
import { useQueryCollection } from "./useQueryCollection";

export type SpinsQueryInput = NonNullable<
  paths["/spins"]["get"]["parameters"]["query"]
>;

export type SpinsQueryData =
  paths["/spins"]["get"]["responses"]["200"]["content"]["application/json"];

function useSpins(input?: SpinsQueryInput) {
  return useQueryCollection<SpinsQueryData>({
    collectionName: "spins",
    input: input,
  });
}

export { useSpins };
