import { useInfiniteQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../config";
import { PersonasAPI } from "../../types/types";

function usePersonas() {
  return useInfiniteQuery<PersonasAPI>({
    queryKey: ["personas"],
    queryFn: async ({ pageParam }) => {
      return fetch(API_BASE_URL + "/personas?page=" + pageParam).then((res) =>
        res.json()
      );
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage._meta.currentPage + 1,
  });
}

export { usePersonas };
