import type { Task } from "../types";
import styles from "./TaskList.module.css";

interface ListTasksProps {
  tasks: Task[];
  handleOnClick: (id: string) => void;
}
export default function ListTasks(props: ListTasksProps) {
  const { tasks, handleOnClick } = props;
  return (
    <ul className={styles.taskContainer}>
      {tasks.map((task) => (
        <li
          key={task.id}
          onClick={() => handleOnClick(task.id)}
          className={`${styles.taskItem} ${task.completed ? styles.completed : ""}`}
        >
          <span>{task.text}</span>
          <span>{task.createdAt.toLocaleString()}</span>
        </li>
      ))}
    </ul>
  );
}
