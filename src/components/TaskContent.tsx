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
    console.log(task);

    return (
        <article className={styles.taskContent}>
            <div onClick={() => handleToogleComplete(task.id)}>
                <span className={`${task.done ? styles.completed : ""}`}>
                    {task.text}
                </span>{" "}
                -{" "}
                <span className={styles.date}>
                    {new Date(task["created_at"])?.toLocaleDateString()}
                </span>
            </div>
            <div className={styles.actionsContainer}>
                <button onClick={() => handleOnEdit(task.id)}>✏</button>
                <button onClick={() => handleOnDelete(task.id)}>🗑️</button>
            </div>
        </article>
    );
}

// {
//     "id": "1a24778c-5c25-4d97-853f-0d4d20df3bce",
//     "text": "Aprender React",
//     "done": false,
//     "created_at": "2025-11-21T01:55:17.350Z",
//     "edited_at": "2025-11-21T01:55:17.350Z"
// }
