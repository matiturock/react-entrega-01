import AddTask from "./components/AddTask";
import { useState } from "react";
import type { Task } from "./types";
import "./App.css";
import { mockTasks } from "./data/mock-todos";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => mockTasks);

  function handleAddTask(task: Task) {
    setTasks([...tasks, task]);
  }

  function toggleComplete(id: string) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  return (
    <>
      <header className="container">
        <h1>Todo List App</h1>
        <AddTask onSubmit={handleAddTask} />
      </header>
      <main className="container">
        <TaskList tasks={tasks} handleOnClick={toggleComplete} />
      </main>
    </>
  );
}
