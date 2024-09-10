type GenericTask = {
  id: string;
  title: string;
  done: boolean;
};

export type Task = GenericTask & {
  createdAt: string;
  subtasks: SubTask[];
};

export type SubTask = GenericTask;
