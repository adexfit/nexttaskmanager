"use client";
import { useTaskStore } from "@/store/useTaskStore";
import { ArrowLeft, Check, Trash2 } from "lucide-react";
import { BaseSyntheticEvent, useState } from "react";
import { taskObjectType } from "@/types/types";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import Header from "@/components/Header";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";

const UpdateTask = () => {
  const showNewTaskPage = useTaskStore((state) => state.showNewTaskPage);
  const tasks = useTaskStore((state) => state.tasks);
  const updateTask = useTaskStore((state) => state.updateTask);
  const removeTask = useTaskStore((state) => state.removeTask);
  const [newNote, setNewNote] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState("");
  const params = useParams();
  const { updateId } = params;
  const router = useRouter();
  const successfulUpdateNotice = () => toast("Task updated successfully");
  const deleteUpdateNotice = () => toast("Task deleted successfully");

  useEffect(() => {
    const neededTask: taskObjectType | undefined = tasks.find(
      (item) => item.id == updateId,
    ) as taskObjectType;
    const { title } = neededTask || {};

    setNewNote(title);

    const dateObj: Date = new Date(
      typeof neededTask?.duedate === "string"
        ? Date.parse(neededTask.duedate)
        : neededTask?.duedate instanceof Date
          ? neededTask.duedate.getTime()
          : Date.now(),
    );

    setSelectedDate(dateObj);
  }, [tasks, updateId]);

  const moveToHome = () => {
    router.push("/");
  };

  const handleSaveNote = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    if (!newNote) {
      setError("A task is required.");
    } else if (newNote.length < 3) {
      setError("Task length must be at least 3 characters long.");
    } else if (selectedDate == null) {
      setError("Select a due date");
    } else {
      setError("");
    }

    if (newNote != "" && selectedDate != null) {
      updateTask(`${updateId}`, {
        title: newNote,
        duedate: selectedDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      });
    } else {
      return;
    }

    setNewNote("");
    showNewTaskPage(false);
    successfulUpdateNotice();
    setTimeout(moveToHome, 1500);
  };

  const handleNoteTyping = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setNewNote(e.target.value);
  };

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    setShowDatePicker(false);
  };

  const handleDeleteTask = () => {
    removeTask(`${updateId}`);
    deleteUpdateNotice();
    setTimeout(moveToHome, 1500);
  };

  return (
    <div className="relative min-h-screen bg-[url(/bg.jpg)] bg-cover bg-center px-2 py-8">
      <div className="absolute inset-0 bg-blue-500/50 dark:bg-gray-800/80"></div>
      <div className="relative z-10 mx-auto h-auto w-full rounded-xl bg-white md:w-2/3 lg:w-1/2 dark:bg-gray-800">
        <Header />
        <ToastContainer />
        <div className="flex flex-col">
          <div className="absolute">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              onDayClick={handleDayClick}
              className={` ${showDatePicker ? "block" : "hidden"} rounded-xl bg-gray-100 p-4 shadow-2xl dark:bg-gray-900 dark:text-white`}
            />
          </div>

          <div className="mt-2 mb-2 flex cursor-pointer items-center justify-between px-4">
            <div
              // onClick={handleSaveBackMove}
              className="flex text-gray-600 hover:text-blue-400 dark:text-white"
            >
              <Link href="/">
                <ArrowLeft />
              </Link>

              {/* <p className="text-sm">Back</p> */}
            </div>

            <button
              className="flex cursor-pointer items-center justify-center gap-1 rounded-lg bg-blue-600 px-2 py-2 text-sm text-white transition-all ease-in hover:bg-blue-500 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600"
              onClick={handleSaveNote}
            >
              <Check /> <p>Save Editing</p>
            </button>
            <button onClick={handleDeleteTask}>
              <Trash2 className="cursor-pointer text-red-400 dark:text-red-300" />
            </button>
          </div>
          <div className="flex flex-col px-4">
            <textarea
              className="outline:none h-64 w-full rounded border-1 border-gray-300 p-2 text-sm focus:outline-blue-400 dark:border-gray-500"
              value={newNote}
              onChange={handleNoteTyping}
              maxLength={100}
              id="updatetextarea"
            />
            <div className="flex items-center justify-between">
              <p className="text-[12px] text-gray-400 italic dark:text-gray-200">
                {200 - newNote?.length} characters left
              </p>
              {error && (
                <p
                  id="message-error"
                  className="mt-2 text-sm text-red-600 dark:text-red-300"
                  role="alert"
                >
                  {error}
                </p>
              )}
            </div>
          </div>
          <div className="my-4 w-full flex-col px-4">
            <p className="text-center text-gray-600 dark:text-gray-400">
              Due date:{" "}
              {selectedDate
                ? ` ${selectedDate.toLocaleDateString()}`
                : "Pick a day."}
            </p>
            <button
              className="my-4 w-full cursor-pointer rounded-sm border-0 bg-blue-500 py-2 text-white hover:bg-blue-600"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              Edit due date
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
