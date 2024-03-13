import { paths } from "../openapi-types";
import {
  UseQueryCollectionOptions,
  useQueryCollection,
} from "./useQueryCollection";

type SpinsQueryInput = NonNullable<
  paths["/spins"]["get"]["parameters"]["query"]
>;

type SpinsQueryData =
  paths["/spins"]["get"]["responses"]["200"]["content"]["application/json"];

export function useSpins(
  input?: SpinsQueryInput,
  opts?: UseQueryCollectionOptions<SpinsQueryData>,
) {
  return useQueryCollection<SpinsQueryData>(
    {
      collectionName: "spins",
      input: input,
    },
    opts,
  );
}
