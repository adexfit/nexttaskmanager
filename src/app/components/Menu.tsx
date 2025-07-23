import { useState } from "react";
import { Plus } from "lucide-react";
import { useTaskStore } from "@/store/useTaskStore";

const Menu = () => {
  const [selectedValue, setSelectedValue] = useState("All tasks");
  const [hiddenDropDown, setHiddenDropDown] = useState<Boolean>(true);
  const { showNewTaskPage, newTaskPage } = useTaskStore();

  const handleDropDown = () => {
    setHiddenDropDown((prev) => {
      return !prev;
    });
  };
  return (
    <div>
      {" "}
      <div className="mt-2 mb-2 flex items-center justify-between px-8">
        <p className="text-blue-400">Tasks {0}</p>

        <div className="relative cursor-pointer" onClick={handleDropDown}>
          <button className="flex h-8 cursor-pointer items-center pr-2 pl-3 focus:outline-none">
            <span className="text-sm leading-none">{selectedValue}</span>
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
            className={`absolute mt-1 bg-white ${hiddenDropDown ? "hidden" : "flex"} w-30 flex-col rounded-lg shadow-lg`}
          >
            <p
              className="flex h-8 items-center px-3 text-sm text-gray-600 hover:text-blue-600"
              onClick={() => setSelectedValue("All tasks")}
            >
              All tasks
            </p>
            <p
              className="flex h-8 items-center px-3 text-sm text-gray-600 hover:text-blue-600"
              onClick={() => setSelectedValue("Completed")}
            >
              Completed
            </p>
            <p
              className="flex h-8 items-center px-3 text-sm text-gray-600 hover:text-blue-600"
              onClick={() => setSelectedValue("Pending")}
            >
              Pending
            </p>
          </div>
        </div>

        <p
          className="flex cursor-pointer items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-800"
          onClick={() => showNewTaskPage(true)}
        >
          <Plus /> Add New
        </p>
      </div>
    </div>
  );
};

export default Menu;
