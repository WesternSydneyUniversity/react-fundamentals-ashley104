import { TaskList, type Task } from "~/components/task-list";
import styles from "./index.module.css";

import { Stick_No_Bills } from "next/font/google";


const sticks = Stick_No_Bills({ subsets: ["latin"] });

const tasks: Task[] = [
  {
    id: "1",
    title: "Task 1",
    state: "ACTIVE"
  },
  {
    id: "2",
    title: "Task 2",
    state: "COMPLETED"
  },
  {
    id: "3",
    title: "Task 3",
    state: "ACTIVE"
  }
];

export default async function Home() {

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 style={sticks.style} className={styles.title}>
            Get Things Done
          </h1>
          <h2 className={styles.subHeader}>
            The easiest way to control your time!
          </h2>
        </header>
        <TaskList tasks={tasks} />
      </div>
    </main>
  );
}
