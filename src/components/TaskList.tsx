import type { TaskId, Task } from "../types";
import TaskContent from "./TaskContent";
import styles from "./TaskList.module.css";

interface ListTasksProps {
  tasks: Task[];
  handleToggleComplete: (taskId: TaskId) => void;
  handleDeleteTask: (taskId: TaskId) => void;
  handleEditTask: (taskId: TaskId) => void;
}
export default function ListTasks(props: ListTasksProps) {
  const { tasks, handleToggleComplete, handleDeleteTask, handleEditTask } =
    props;
  return (
    <ul className={styles.taskContainer}>
      {tasks.map((task) => (
        <li
          key={task.id}
          className={styles.taskItem}
        >
          <TaskContent
            key={task.id}
            task={task}
            handleToogleComplete={handleToggleComplete}
            handleOnDelete={handleDeleteTask}
            handleOnEdit={handleEditTask}
          />
        </li>
      ))}
    </ul>
  );
}
