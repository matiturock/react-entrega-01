import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { Task } from "../types";

export function useTasks(): UseQueryResult<Task[], Error> {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      try {
        const response = await fetch("/.netlify/functions/tasks");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.tasks || [];
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        throw error;
      }
    },
  });
};