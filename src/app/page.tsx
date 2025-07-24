"use client";

import Header from "@/components/Header";
import { useTheme } from "next-themes";
import Menu from "@/components/Menu";
import { useTaskStore } from "@/store/useTaskStore";
import NewTask from "@/components/NewTask";
import AllNotes from "@/components/AllNotes";
import UpdateTask from "@/components/UpdateTask";

export default function Home() {
  const { theme } = useTheme();
  const { newTaskPage } = useTaskStore();

  console.log(theme);
  return (
    <div className="min-h-screen bg-blue-500 px-6 py-8 dark:bg-gray-800">
      <div className="mx-auto h-auto w-full rounded-xl bg-white md:w-2/3 lg:w-1/2 dark:bg-gray-700">
        <Header />
        {!newTaskPage && <Menu />}
        {!newTaskPage && <hr className="text-gray-100 dark:text-gray-600" />}
        {!newTaskPage && <AllNotes />}
        {newTaskPage && <NewTask />}
      </div>
    </div>
  );
}

// [#E3E3E3]
