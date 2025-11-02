import { useState } from "react";
import { mockTasks } from "./data/mock-todos";
import { filterValues } from "./types";

import type { TaskId, Task } from "./types";
import type { Filters } from "./types";

import Nav from "./components/Nav";
import AddTask from "./components/AddTask";
import Summary from "./components/Summary";
import FilterButtons from "./components/FilterButtons";
import TaskList from "./components/TaskList";

import "./App.css";
import useTasks from "./hooks/useTasks";

export default function App() {
  const { tasks, setTasks, totalTasks, completedTasks } = useTasks();
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

  function deleteTask(taskId: TaskId) {
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id !== taskId);
    });
  }

  function editTask(taskId: TaskId) {
    console.log("Editing Task");
  }

  return (
    <>
      <header className="container">
        <Nav>
          <li>
            <a>About</a>
          </li>
          <li>
            <a>User</a>
          </li>
          <li>
            <a>Config</a>
          </li>
        </Nav>
        <AddTask onSubmit={handleAddTask} />
        <Summary total={totalTasks} completed={completedTasks} />
        <FilterButtons onFilterChange={handleFilterChange} />
      </header>
      <main className="container">
        <TaskList
          tasks={filteredTasks}
          handleToggleComplete={toggleComplete}
          handleDeleteTask={deleteTask}
          handleEditTask={editTask}
        />
      </main>
    </>
  );
}
