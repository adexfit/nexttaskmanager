"use client";

import Header from "@/components/Header";
import Menu from "@/components/Menu";
import { useTaskStore } from "@/store/useTaskStore";
import NewTask from "@/components/NewTask";
import AllNotes from "@/components/AllNotes";

export default function Home() {
  const { newTaskPage } = useTaskStore();

  return (
    <div className="relative min-h-screen bg-[url(/bg.jpg)] bg-cover bg-center px-2 py-8">
      <div className="absolute inset-0 bg-blue-500/50 dark:bg-gray-800/80"></div>
      <div className="relative z-10 mx-auto h-auto w-full rounded-xl bg-white md:w-2/3 lg:w-1/2 dark:bg-gray-800">
        <Header />
        {!newTaskPage && <Menu />}
        {!newTaskPage && <hr className="text-gray-100 dark:text-gray-600" />}
        {!newTaskPage && <AllNotes />}
        {newTaskPage && <NewTask />}
      </div>
    </div>
  );
}
