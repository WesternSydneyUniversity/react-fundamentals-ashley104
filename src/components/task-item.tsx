import type { Task } from "./task-list";

import styles from "./task-item.module.css";
import { useState } from "react";

export function TaskItem({ task, onDelete, onComplete }: { task: Task, onDelete: (id: string) => void, onComplete: (id: string) => void}) {
  
  return (
    <div className={styles.container}>
      <div className={styles.checkbox}>
        <div className={styles.round}>
          <input
            type="checkbox"
            id={`task-${task.id}`}
            data-testid={`task-${task.id}`}
            checked={task.state === "COMPLETED"}
            onChange={() => {onComplete(task.id)}}
          />
          <label htmlFor={`task-${task.id}`}></label>
        </div>
      </div>
      <span className={styles.title}  style={{ textDecoration: task.state === "COMPLETED" ?'line-through' : 'none' }}>{task.title}</span>
      <div className={styles.actions}>
        <button
          data-testid={`delete-${task.id}`}
          className={styles.deleteButton}
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
