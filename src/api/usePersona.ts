import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../config";
import { PersonaAPI } from "../../types/types";

function usePersona(id: string) {
  return useQuery<PersonaAPI>({
    queryKey: ["persona", id],
    queryFn: () =>
      fetch(API_BASE_URL + "/personas/" + id).then((res) => res.json()),
  });
}

export { usePersona };
