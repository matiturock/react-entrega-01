import { useState } from "react";
import type { Task } from "../types";
import { mockTasks } from "../data/mock-todos.ts";

export default function useTasks(newTaks: Task[] = mockTasks) {
  const [tasks, setTasks] = useState<Task[]>(newTaks);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  const summaryTasks = { totalTasks, completedTasks };

  function addTask(task: Task) {
    setTasks([...tasks, task]);
  }

  function editTask(taskId: string, updatedTask: Partial<Task>) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task,
      ),
    );
  }

  function deleteTask(taskId: string) {
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id !== taskId);
    });
  }

  function toggleComplete(taskId: string) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  const handlersTasks = {
    addTask, editTask, deleteTask, toggleComplete
  };

  return {
    tasks,
    handlersTasks,
    summaryTasks
  };
}
