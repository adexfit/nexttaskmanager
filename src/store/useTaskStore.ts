import { create } from "zustand";
import { persist } from "zustand/middleware";
import { taskState } from "@/types/types";

export const useTaskStore = create<taskState>()(
  persist(
    (set) => ({
      newTaskPage: false,
      showNewTaskPage: (state) => set({ newTaskPage: state }),
      dropdownRef: null,
      setDropdownRef: (ref) => set({ dropdownRef: ref }),
      hideFilterDropdown: true,
      setHideFilterDropdown: (state) => set({ hideFilterDropdown: state }),

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
      partialize: (state) => ({
        newTaskPage: state.newTaskPage,
        showNewTaskPage: state.showNewTaskPage,
        setDropdownRef: state.setDropdownRef,
        hideFilterDropdown: state.hideFilterDropdown,
        setHideFilterDropdown: state.setHideFilterDropdown,
        filterOption: state.filterOption,
        setFilterOption: state.setFilterOption,
        tasks: state.tasks,
        addTask: state.addTask,
        updateTask: state.updateTask,
        removeTask: state.removeTask,
        clearTasks: state.clearTasks,
      }),
    },
  ),
);
