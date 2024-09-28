import { InferResponseType } from "hono";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export type ResponseType = InferResponseType<
  (typeof client.api.projects)["$get"],
  200
>;

export const useGetAllProjects = () => {
  const query = useInfiniteQuery<ResponseType, Error>({
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    queryKey: ["allProjects"],
    queryFn: async ({ pageParam }) => {
      const response = await client.api.projects.$get({
        query: {
          page: (pageParam as number).toString(),
          limit: "5",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }

      return response.json();
    },
  });
  return query;
};
