import { paths } from "../openapi-types";
import {
  UseQueryCollectionOptions,
  useQueryCollection,
} from "./useQueryCollection";

type ShowsQueryInput = NonNullable<
  paths["/shows"]["get"]["parameters"]["query"]
>;

export type ShowsQueryData =
  paths["/shows"]["get"]["responses"]["200"]["content"]["application/json"];

export function useShows(
  input: ShowsQueryInput = {},
  opts?: UseQueryCollectionOptions<ShowsQueryData>,
) {
  return useQueryCollection<ShowsQueryData>(
    {
      collectionName: "shows",
      input: input,
    },
    opts,
  );
}
