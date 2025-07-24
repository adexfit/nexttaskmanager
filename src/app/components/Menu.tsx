import { useState } from "react";
import { Plus } from "lucide-react";
import { useTaskStore } from "@/store/useTaskStore";

const Menu = () => {
  const [hiddenDropDown, setHiddenDropDown] = useState<Boolean>(true);
  const { showNewTaskPage, newTaskPage } = useTaskStore();
  const { tasks, filterOption, setFilterOption } = useTaskStore();
  const [selectedValue, setSelectedValue] = useState(filterOption);

  const handleDropDown = () => {
    setHiddenDropDown((prev) => {
      return !prev;
    });
  };
  return (
    <div>
      <div className="mt-2 mb-2 flex items-center justify-between px-6">
        <p className="text-blue-600 dark:text-blue-200">
          Tasks: {tasks.length}{" "}
        </p>

        <div className="relative cursor-pointer" onClick={handleDropDown}>
          <button className="flex h-8 cursor-pointer items-center pr-2 pl-3 focus:outline-none">
            <span className="text-sm leading-none">{filterOption}</span>
            <svg
              className="mt-px ml-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div
            className={`absolute mt-1 bg-white ${hiddenDropDown ? "hidden" : "flex"} w-30 flex-col rounded-lg shadow-lg dark:bg-gray-800`}
          >
            <p
              className="flex h-8 items-center px-3 text-sm text-gray-600 hover:text-blue-600"
              onClick={() => setFilterOption("All tasks")}
            >
              All tasks
            </p>
            <p
              className="flex h-8 items-center px-3 text-sm text-gray-600 hover:text-blue-600"
              onClick={() => setFilterOption("completed")}
            >
              Completed
            </p>
            <p
              className="flex h-8 items-center px-3 text-sm text-gray-600 hover:text-blue-600"
              onClick={() => setFilterOption("pending")}
            >
              Pending
            </p>
          </div>
        </div>

        <button
          className="flex cursor-pointer items-center justify-center gap-1 rounded-lg bg-blue-600 px-2 py-2 text-sm text-white transition-all ease-in hover:bg-blue-500 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600"
          onClick={() => showNewTaskPage(true)}
        >
          <Plus /> <span className="hidden md:flex">Add</span> New
        </button>
      </div>
    </div>
  );
};

export default Menu;
