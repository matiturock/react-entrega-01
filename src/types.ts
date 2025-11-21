export type TaskId = `${string}-${string}-${string}-${string}-${string}`;

export interface Task {
  id: TaskId;
  text: string;
  created_at: Date;
  edited_at: Date;
  done: boolean;
}

export type Filters = "All" | "Active" | "Completed";

export const filterValues = {
  all: "All" as Filters,
  active: "Active" as Filters,
  done: "Completed" as Filters,
} as const;
