import styles from "./TaskList.module.css";
import type { TaskId, Task } from "../types";

interface TaskContentProps {
  task: Task;
  handleToogleComplete: (taskId: TaskId) => void;
  handleOnEdit: (taskId: TaskId) => void;
  handleOnDelete: (id: TaskId) => void;
}

export default function TaskContent({
  task,
  handleOnDelete,
  handleOnEdit,
  handleToogleComplete,
}: TaskContentProps) {
  return (
    <article className={styles.taskContent}>
      <div onClick={() => handleToogleComplete(task.id)}>
        <span className={`${task.completed ? styles.completed : ""}`}>{task.text}</span> -{" "}
        <span className={styles.date}>{task.createdAt.toLocaleString()}</span>
      </div>
      <div className={styles.actionsContainer}>
        <button onClick={() => handleOnEdit(task.id)}>✏</button>
        <button onClick={() => handleOnDelete(task.id)}>🗑️</button>
      </div>
    </article>
  );
}
