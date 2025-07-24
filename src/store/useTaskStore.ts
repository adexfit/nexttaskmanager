import { create } from "zustand";
import { persist } from "zustand/middleware";
import { taskObjectType, taskState } from "@/types/types";

export const useTaskStore = create<taskState>()(
  persist(
    (set) => ({
      newTaskPage: false,
      filterOption: "All tasks",
      setFilterOption: (state) => set({ filterOption: state }),
      showNewTaskPage: (state) => set({ newTaskPage: state }),
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

// replaceData: (newTask) => set(() => ({ tasks: newTask })),

// updateData: (key, value) =>
//   set((state) => ({
//     tasks: { ...state.tasks, [key]: value },
//   })),

// reset: () => set(() => ({ tasks: [] })),
// updateData: (key: string, value: any) => void;
