import type { RefObject } from "react";

export type taskObjectType = {
  id: string;
  title: string;
  status: string;
  duedate: Date | string;
};

export type taskState = {
  newTaskPage: boolean;
  dropdownRef: RefObject<HTMLDivElement> | null;
  setDropdownRef: (ref: RefObject<HTMLDivElement>) => void;
  hideFilterDropdown: boolean;
  setHideFilterDropdown: (state: boolean) => void;
  filterOption: string;
  setFilterOption: (wanted: string) => void;
  showNewTaskPage: (state: boolean) => void;
  tasks: taskObjectType[];

  addTask: (task: Omit<taskObjectType, "id">) => void;
  updateTask: (id: string, updates: Partial<taskObjectType>) => void;
  removeTask: (id: string) => void;
  clearTasks: () => void;
};
