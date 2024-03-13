import { paths } from "../openapi-types";
import {
  UseQueryCollectionOptions,
  useQueryCollection,
} from "./useQueryCollection";

type PersonasQueryInput = NonNullable<
  paths["/personas"]["get"]["parameters"]["query"]
>;

type PersonasQueryData =
  paths["/personas"]["get"]["responses"]["200"]["content"]["application/json"];

export function usePersonas(
  input?: PersonasQueryInput,
  opts?: UseQueryCollectionOptions<PersonasQueryData>,
) {
  return useQueryCollection<PersonasQueryData>(
    {
      collectionName: "personas",
      input: input,
    },
    opts,
  );
}
