import { create } from "zustand";

type taskState = {
  newTaskPage: boolean;
  showNewTaskPage: (state: boolean) => void;
};

export const useTaskStore = create<taskState>((set) => ({
  newTaskPage: false,
  showNewTaskPage: (state) => set({ newTaskPage: state }),
}));
