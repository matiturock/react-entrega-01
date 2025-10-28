export type TaskId = `${string}-${string}-${string}-${string}-${string}`;

export interface Task {
  id: TaskId;
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
