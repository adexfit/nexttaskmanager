"use client";
import { useTaskStore } from "@/store/useTaskStore";
import { Trash2, SquarePen } from "lucide-react";
import { BaseSyntheticEvent, useState, useEffect } from "react";
import { taskObjectType } from "@/types/types";
import Link from "next/link";

const AllNotes = () => {
  const {
    tasks,
    removeTask,
    updateTask,
    filterOption,
    setFilterOption,
    newTaskPage,
  } = useTaskStore();
  const [dataToShow, setDataToShow] = useState<taskObjectType[]>(tasks);

  useEffect(() => {
    if (filterOption == "All tasks") {
      setDataToShow(tasks);
    }
    if (filterOption == "completed") {
      setDataToShow(tasks.filter((task) => task.status == "completed"));
    }
    if (filterOption == "pending") {
      setDataToShow(tasks.filter((task) => task.status == "pending"));
    }
  }, [filterOption, setFilterOption, tasks]);

  const handleMarkDone = (e: BaseSyntheticEvent, id: string) => {
    let initialStatus: string = "";
    tasks.map((a) => (a.id == id ? (initialStatus = a.status) : ""));

    if (initialStatus == "pending") {
      updateTask(id, { status: "completed" });
    } else {
      updateTask(id, { status: "pending" });
    }
  };

  return (
    <div className="pb-2">
      {dataToShow.map((task) => (
        <div key={task.id}>
          <div className="flex cursor-pointer items-center justify-between px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-600">
            <div className="flex flex-col">
              <div className="flex place-items-center gap-2">
                <div>
                  <input
                    type="checkbox"
                    className={`peer relative h-5 w-5 cursor-pointer appearance-none rounded border-2 border-gray-400 transition-colors duration-200 before:absolute before:top-[-2px] before:left-[3px] before:text-sm before:text-white before:opacity-0 before:content-['✓'] checked:border-blue-500 checked:bg-blue-500 checked:before:opacity-100 focus:ring-2 focus:ring-blue-300 focus:outline-none dark:border-gray-500 dark:checked:border-blue-400 dark:checked:bg-blue-400 dark:focus:ring-blue-600`}
                    checked={task.status == "pending" ? false : true}
                    onChange={(e) => handleMarkDone(e, task.id)}
                    id={task.id}
                    name={task.id}
                  />
                </div>

                <div className="flex flex-col flex-wrap">
                  <p className="max-w-[260px] wrap-break-word">{task.title}</p>
                </div>
              </div>

              <p
                className={`pl-7 text-[12px] italic ${task.status == "pending" ? "text-red-400 dark:text-red-300" : "text-blue-600 dark:text-blue-300"} `}
              >
                status: {task.status}
              </p>
              <div className="flex items-center pl-7 text-[12px] italic">
                <span className="text-gray-400 dark:text-white">
                  Due date:{" "}
                </span>

                {task.duedate instanceof Date
                  ? task.duedate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : task.duedate}
              </div>
            </div>

            <div className="flex w-1/3 justify-between gap-0.5 md:w-1/6">
              <button onClick={() => removeTask(task.id)}>
                <Trash2 className="cursor-pointer text-red-400 dark:text-red-300" />
              </button>
              <Link href={`/update/${task.id}`}>
                <button>
                  <SquarePen className="cursor-pointer text-blue-400 dark:text-blue-300" />
                </button>
              </Link>
            </div>
          </div>

          {!newTaskPage && <hr className="text-gray-100 dark:text-gray-600" />}
        </div>
      ))}
      <div className="py-4 text-center text-gray-400 italic dark:text-gray-400">
        {dataToShow.length == 0 ? <p>No task available</p> : ""}
      </div>
    </div>
  );
};

export default AllNotes;
