"use client";

import Header from "./components/Header";
import { useTheme } from "next-themes";
import Menu from "./components/Menu";
import { useTaskStore } from "@/store/useTaskStore";
import NewTask from "./components/NewTask";

export default function Home() {
  const { theme } = useTheme();
  const { showNewTaskPage, newTaskPage } = useTaskStore();

  console.log(theme);
  return (
    <div className="min-h-screen bg-blue-500 px-6 py-8 dark:bg-gray-900">
      <div className="mx-auto h-[500px] w-full rounded-xl bg-white md:w-2/3 lg:w-1/2">
        <Header />

        {newTaskPage ? <NewTask /> : <Menu />}
        <hr className="text-gray-200" />
      </div>
    </div>
  );
}

// [#E3E3E3]
