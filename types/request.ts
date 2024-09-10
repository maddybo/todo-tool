import type { SubTask, Task } from "./task";

export type TaskRequest = Omit<Task, "subtasks"> & {
  subtasks: string[];
};

export type SubTaskRequest = SubTask;
