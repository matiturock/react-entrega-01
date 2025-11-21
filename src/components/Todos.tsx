import { useFilters } from "../hooks/useFilters";
import { filterValues, type Task } from "../types";
import AddTask from "./AddTask";
import FilterButtons from "./FilterButtons";
import Nav from "./Nav";
import Summary from "./Summary";
import TaskList from "./TaskList";
import { useTasks } from "../hooks/useTasks";

export default function Todos() {
    const { data, isLoading, isError, error } = useTasks();

    const { activeFilter, handleFilterChange } = useFilters();

    const filteredTasks = data?.filter((task: Task) => {
        if (activeFilter === filterValues.active) {
            return !task.done;
        }
        if (activeFilter === filterValues.done) {
            return task.done;
        }
        return true;
    });

    if (isLoading) return <span>Loading...</span>;
    if (isError) return <span>Error: {(error as Error)?.message}</span>;

    return (
        <>
            <header className="container">
                <Nav />
                <AddTask onSubmit={() => console.log("Add task")} />
                <Summary
                    total={data?.length || 0}
                    completed={
                        data?.filter((task: Task) => task.done).length || 0
                    }
                />
                <FilterButtons
                    activeFilter={activeFilter}
                    onFilterChange={handleFilterChange}
                />
            </header>
            <main className="container">
                <TaskList
                    tasks={filteredTasks ?? []}
                    handleToggleComplete={() => console.log("Toggle complete")}
                    handleDeleteTask={() => console.log("Delete task")}
                    handleEditTask={() => console.log("Edit task")}
                />
            </main>
        </>
    );
}
