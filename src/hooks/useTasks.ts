import { useState } from "react";
import type { Task } from "../types";
import { mockTasks } from "../data/mock-todos.ts";

export default function useTasks(newTaks: Task[] = mockTasks) {
  const [tasks, setTasks] = useState<Task[]>(newTaks);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return {
    tasks,
    setTasks,
    totalTasks,
    completedTasks,
  };
}
