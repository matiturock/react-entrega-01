import type { Task } from "../types";

export async function getAllTasks() {
  return fetch("/.netlify/functions/tasks")
    .then((response) => response.json())
    .then((data) => data.tasks);
}

export async function postTask(newTask: Task) {
  return fetch("/.netlify/functions/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  }).then((response) => response.json());
}