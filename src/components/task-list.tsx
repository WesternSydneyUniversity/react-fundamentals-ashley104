"use client";

import { useState } from "react";
import { TaskItem } from "./task-item";
import styles from "./task-list.module.css";

export type Task = {
  id: string;
  title: string;
  state: "PINNED" | "COMPLETED" | "ACTIVE";
};

export function TaskList({ tasks }: { tasks: Task[] }) {

  const [tasklist, setTasks] = useState<Task[]>(tasks);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    //console.log("addTask");
    if (newTask === "") {
      return;
    }
    setTasks([
      ...tasklist,
      {
        id: ((tasklist.length) + 1 ).toString(),
        title: newTask,
        state: "ACTIVE" as "PINNED" | "COMPLETED" | "ACTIVE",
      },
    ]);
    //console.log("New tasks:", newTask, tasklist);
    setNewTask("");
  };

  const deleteTask = (id: string) => {
    //console.log("deleteTask");
    setTasks(tasklist.filter((task) => task.id !== id));
  };

  const completeTask = (id: string) => {
    //console.log("completeTask");
    setTasks(
      tasklist.map((task) =>
        task.id === id
          ? {
              ...task,
              state: task.state === "ACTIVE" ? "COMPLETED" : "ACTIVE",
            }
          : task
      )
    );
  }

  const activeTasks = tasklist.filter((task) => task.state === "ACTIVE");

  return (
    <>
      <div>
        <section className={styles.counter}>
          <div className={styles.taskLabel}>{activeTasks.length} tasks</div>
        </section>
        <section className={styles.section}>
          {tasklist.map((task) => (
            <TaskItem key={task.id} task={task} onDelete={deleteTask} onComplete={completeTask}/>
          ))}
        </section>
      </div>
      <section className={styles.inputContainer}>
        <input
          type="text"
          placeholder="What needs to be done?"
          className={styles.taskInput}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className={styles.taskButton} onClick={addTask}>Add Task</button>
      </section>
    </>
  );
}
