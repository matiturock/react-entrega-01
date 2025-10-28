import type { Task } from "../types";

export const mockTasks: Task[] = [
  {
    id: "6277473e-4714-4bc5-b144-13ff0b8d72ed",
    text: "Learn React",
    createdAt: new Date(),
    completed: false,
  },
  {
    id: "e1a6d751-4af4-4176-8485-df7f42329cff",
    text: "Learn TypeScript",
    createdAt: new Date(),
    completed: false,
  },
  {
    id: "815c94cb-f0cf-49c2-a520-4abddd969761",
    text: "Learn GraphQL",
    createdAt: new Date(),
    completed: false,
  },
  {
    id: "b4f3e8e2-5f4e-4d3a-9f4a-2c3e5f6a7b8c",
    text: "Build a Todo App",
    createdAt: new Date(),
    completed: true,
  },
  {
    id: "d2c3e4f5-6a7b-8c9d-0e1f-2a3b4c5d6e7f",
    text: "Write Unit Tests",
    createdAt: new Date(),
    completed: false,
  }
];
