export type taskObjectType = {
  id: string;
  title: string;
  status: string;
  duedate: Date | string;
};

export type taskState = {
  newTaskPage: boolean;
  filterOption: string;
  setFilterOption: (wanted: string) => void;
  showNewTaskPage: (state: boolean) => void;
  tasks: taskObjectType[];

  addTask: (task: Omit<taskObjectType, "id">) => void;
  updateTask: (id: string, updates: Partial<taskObjectType>) => void;
  removeTask: (id: string) => void;
  clearTasks: () => void;
};
