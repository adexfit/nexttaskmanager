"use client";

import Header from "@/components/Header";
import { useTheme } from "next-themes";
import Menu from "@/components/Menu";
import { useTaskStore } from "@/store/useTaskStore";
import NewTask from "@/components/NewTask";
import AllNotes from "@/components/AllNotes";
// import UpdateTask from "@/components/UpdateTask";

export default function Home() {
  const { theme } = useTheme();
  const { newTaskPage } = useTaskStore();

  console.log(theme);
  return (
    <div className="relative min-h-screen bg-[url(/bg.jpg)] bg-cover bg-center px-6 py-8">
      <div className="absolute inset-0 bg-blue-500/50 dark:bg-gray-800/80"></div>
      <div className="relative z-10 mx-auto h-auto w-full rounded-xl bg-white md:w-2/3 lg:w-1/2 dark:bg-gray-700">
        <Header />
        {!newTaskPage && <Menu />}
        {!newTaskPage && <hr className="text-gray-100 dark:text-gray-600" />}
        {!newTaskPage && <AllNotes />}
        {newTaskPage && <NewTask />}
      </div>
    </div>
  );
}

// [#E3E3E3]   min-h-screen
// "bg-[url(/bg.jpg)]"
// bg-blue-900/80
