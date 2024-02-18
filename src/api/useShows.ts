import { paths } from "./openapi-types";
import { useQueryCollection } from "./useQueryCollection";

export type ShowsQueryInput = NonNullable<
  paths["/shows"]["get"]["parameters"]["query"]
>;

export type ShowsQueryData =
  paths["/shows"]["get"]["responses"]["200"]["content"]["application/json"];

function useShows(input: ShowsQueryInput = {}) {
  return useQueryCollection<ShowsQueryData>({
    collectionName: "shows",
    input: input,
  });
}

export { useShows };
