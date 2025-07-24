import { create } from "zustand";
import { persist } from "zustand/middleware";
import { taskState } from "@/types/types";

export const useTaskStore = create<taskState>()(
  persist(
    (set) => ({
      newTaskPage: false,
      showNewTaskPage: (state) => set({ newTaskPage: state }),

      filterOption: "All tasks",
      setFilterOption: (state) => set({ filterOption: state }),

      tasks: [],

      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: crypto.randomUUID() }],
        })),

      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task,
          ),
        })),

      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((item) => item.id !== id),
        })),

      clearTasks: () => set({ tasks: [] }),
    }),
    {
      name: "taskjson-storage",
    },
  ),
);
