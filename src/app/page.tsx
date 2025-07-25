"use client";

import Header from "@/components/Header";
import Menu from "@/components/Menu";
import { useTaskStore } from "@/store/useTaskStore";
import NewTask from "@/components/NewTask";
import AllNotes from "@/components/AllNotes";
import { ToastContainer } from "react-toastify";
import { useEffect, useRef } from "react";

export default function Home() {
  const newTaskPage = useTaskStore((state) => state.newTaskPage);
  const dropdownRef = useRef<HTMLDivElement>(
    null,
  ) as React.RefObject<HTMLDivElement>;
  const setDropdownRef = useTaskStore((state) => state.setDropdownRef);
  const setHideFilterDropdown = useTaskStore(
    (state) => state.setHideFilterDropdown,
  );

  useEffect(() => {
    setDropdownRef(dropdownRef);
  }, [setDropdownRef]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setHideFilterDropdown(true);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[url(/bg.jpg)] bg-cover bg-center px-2 py-2 md:py-8">
      <div className="absolute inset-0 bg-blue-500/50 dark:bg-gray-800/80"></div>
      <div className="relative z-10 mx-auto h-auto w-full rounded-xl bg-white md:w-2/3 lg:w-1/2 dark:bg-gray-800">
        <Header />
        <ToastContainer />
        {!newTaskPage && <Menu />}
        {!newTaskPage && <hr className="text-gray-100 dark:text-gray-600" />}
        {!newTaskPage && <AllNotes />}
        {newTaskPage && <NewTask />}
      </div>
    </div>
  );
}
