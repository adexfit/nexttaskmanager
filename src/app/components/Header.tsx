import ThemeSwitch from "./ThemeSwitch";
import { useState } from "react";

const Header = () => {
  return (
    <>
      <div className="flex items-center justify-between rounded-t-lg bg-gray-100 px-6 py-2 dark:bg-gray-600">
        <h1 className="text-sm font-bold text-gray-600 dark:text-white">
          Task Manager
        </h1>
        <ThemeSwitch />
      </div>
    </>
  );
};

export default Header;
