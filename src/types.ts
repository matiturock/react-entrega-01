export interface Task {
  id: `${string}-${string}-${string}-${string}-${string}`;
  text: string;
  createdAt: Date;
  completed: boolean;
}

export type Filters = "All" | "Active" | "Completed";

export const filterValues = {
  all: "All" as Filters,
  active: "Active" as Filters,
  completed: "Completed" as Filters,
} as const;
