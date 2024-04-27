import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it } from "vitest";
import { TaskList } from "./task-list";

describe("Task List", function () {
  it("Renders the number of active tasks", function () {
    render(<TaskList tasks={[]} />);
    expect(screen.getByText("0 tasks")).toBeInTheDocument();
  });

  it("Renders the number of active tasks", function () {
    render(
      <TaskList
        tasks={[
          { id: "1", title: "Task 1", state: "ACTIVE" },
          { id: "2", title: "Task 1", state: "COMPLETED" }
        ]}
      />
    );
    expect(screen.getByText("1 tasks")).toBeInTheDocument();
  });

  it("Renders the number of active tasks", function () {
    render(
      <TaskList
        tasks={[
          { id: "1", title: "Task 1", state: "ACTIVE" },
          { id: "2", title: "Task 2", state: "COMPLETED" },
          { id: "3", title: "Task 3", state: "ACTIVE" }
        ]}
      />
    );
    expect(screen.getByText("2 tasks")).toBeInTheDocument();
  });

  it("Renders completed tasks as with line through", function () {
    render(
      <TaskList
        tasks={[
          { id: "1", title: "Task 1", state: "ACTIVE" },
          { id: "2", title: "Task 2", state: "COMPLETED" }
        ]}
      />
    );
    expect(screen.getByText("Task 1")).not.toHaveStyle(
      "text-decoration: line-through"
    );
    expect(screen.getByText("Task 2")).toHaveStyle(
      "text-decoration: line-through"
    );
  });

  it("Completes tasks by clicking on the checkbox", async function () {
    render(
      <TaskList
        tasks={[
          { id: "1", title: "Task 1", state: "ACTIVE" },
          { id: "2", title: "Task 2", state: "COMPLETED" }
        ]}
      />
    );
    expect(screen.getByText("Task 1")).not.toHaveStyle(
      "text-decoration: line-through"
    );
    await userEvent.click(screen.getByTestId(`task-1`));
    expect(screen.getByText("Task 1")).toHaveStyle(
      "text-decoration: line-through"
    );
    expect(screen.getByTestId("task-1")).toBeChecked();
  });

  it("Adds task via the input box and changes the counter", async function () {
    render(<TaskList tasks={[]} />);
    expect(screen.getByText("0 tasks")).toBeInTheDocument();

    await userEvent.type(
      screen.getByPlaceholderText("What needs to be done?"),
      "New Task"
    );
    await userEvent.click(screen.getByText("Add Task"));

    const newTask = await screen.findByText("New Task");
    expect(newTask).toBeInTheDocument();
    expect(newTask).not.toHaveStyle("text-decoration: line-through");
    expect(screen.getByText("1 tasks")).toBeInTheDocument();
  });

  it("Can delete tasks", async function () {
    render(
      <TaskList
        tasks={[
          { id: "1", title: "Task 1", state: "ACTIVE" },
          { id: "2", title: "Task 2", state: "COMPLETED" }
        ]}
      />
    );
    expect(screen.getByText("1 tasks")).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("delete-1"));

    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
    expect(screen.getByText("0 tasks")).toBeInTheDocument();
  });
});
