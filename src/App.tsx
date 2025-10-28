import { useState } from "react";
import { mockTasks } from "./data/mock-todos";
import { filterValues } from "./types";

import type { TaskId, Task } from "./types";
import type { Filters } from "./types";

import TaskList from "./components/TaskList";
import FilterButtons from "./components/FilterButtons";
import AddTask from "./components/AddTask";
import Summary from "./components/Summary";

import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => mockTasks);
  const [activeFilter, setActiveFilter] = useState<Filters>(filterValues.all);

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === filterValues.active) {
      return !task.completed;
    }
    if (activeFilter === filterValues.completed) {
      return task.completed;
    }
    return true;
  });

  function handleAddTask(task: Task) {
    setTasks([...tasks, task]);
  }

  function toggleComplete(taskId: TaskId) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function handleFilterChange(filter: Filters) {
    setActiveFilter(filter);
  }

  return (
    <>
      <header className="container">
        <h1>Todo List App</h1>
        <AddTask onSubmit={handleAddTask} />
        <FilterButtons onFilterChange={handleFilterChange} />
      </header>
      <main className="container">
        <Summary
          total={tasks.length}
          completed={tasks.filter((task) => task.completed).length}
        />
        <TaskList tasks={filteredTasks} handleOnClick={toggleComplete} />
      </main>
    </>
  );
}
