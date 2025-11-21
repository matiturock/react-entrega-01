import { useState, useRef } from "react";
import type { FormEvent } from "react";
import type { Task } from "../types";
import styles from "./AddTask.module.css";

interface AddTaskProps {
    onSubmit: (task: Task) => void;
}

export default function AddTask({ onSubmit }: AddTaskProps) {
    const [userInput, setUserInput] = useState("");
    const [error, setError] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!userInput) {
            setError(true);
            inputRef.current?.setAttribute("aria-invalid", "true");
            inputRef.current?.focus();
            return;
        }

        setError(false);
        inputRef.current?.removeAttribute("aria-invalid");

        onSubmit({
            id: crypto.randomUUID(),
            text: userInput,
            created_at: new Date(),
            done: false,
        });

        setUserInput("");
    };

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setUserInput(value);
        if (value.length > 0) {
            setError(false);
            inputRef.current?.removeAttribute("aria-invalid");
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <fieldset role="group">
                    <input
                        ref={inputRef}
                        name="task"
                        type="text"
                        placeholder="Describe your task"
                        value={userInput}
                        onChange={handleOnChange}
                        aria-describedby="invalid-helper"
                    />
                    <input type="submit" value="Add Task" />
                </fieldset>
                <div className={styles.errorContainer}>
                    {error && (
                        <small id="invalid-helper" className={styles.error}>
                            Value can't be empty!
                        </small>
                    )}
                </div>
            </form>
        </div>
    );
}
