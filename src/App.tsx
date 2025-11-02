import { filterValues } from "./types";
import Nav from "./components/Nav";
import AddTask from "./components/AddTask";
import Summary from "./components/Summary";
import FilterButtons from "./components/FilterButtons";
import TaskList from "./components/TaskList";
import useTasks from "./hooks/useTasks";
import { useFilters } from "./hooks/useFilters";
import "./App.css";


export default function App() {
  const { tasks, handlersTasks, summaryTasks } = useTasks();
  const { activeFilter, handleFilterChange } = useFilters();

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === filterValues.active) {
      return !task.completed;
    }
    if (activeFilter === filterValues.completed) {
      return task.completed;
    }
    return true;
  });

  return (
    <>
      <header className="container">
        <Nav />
        <AddTask onSubmit={handlersTasks.addTask} />
        <Summary total={summaryTasks.totalTasks} completed={summaryTasks.completedTasks} />
        <FilterButtons activeFilter={activeFilter} onFilterChange={handleFilterChange} />
      </header>
      <main className="container">
        <TaskList
          tasks={filteredTasks}
          handleToggleComplete={handlersTasks.toggleComplete}
          handleDeleteTask={handlersTasks.deleteTask}
          handleEditTask={() => console.log("Edit task")}
        />
      </main>
    </>
  );
}
