"use client";
import { useTaskStore } from "@/store/useTaskStore";
import { ArrowLeft, Check } from "lucide-react";
import { BaseSyntheticEvent, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { toast } from "react-toastify";

const NewTask = () => {
  const showNewTaskPage = useTaskStore((state) => state.showNewTaskPage);
  const [newNote, setNewNote] = useState("");
  const { addTask } = useTaskStore();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState("");
  const createNotification = () => toast("Task created successfully");

  const handleSaveBackMove = () => {
    showNewTaskPage(false);
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
      addTask({
        title: newNote,
        status: "pending",
        duedate: selectedDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      });
    } else {
      return;
    }
    createNotification();
    setNewNote("");
    showNewTaskPage(false);
  };

  const handleNoteTyping = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setNewNote(e.target.value);
  };

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    setShowDatePicker(false);
  };

  return (
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
          onClick={handleSaveBackMove}
          className="flex text-gray-600 hover:text-blue-400 dark:text-white"
        >
          <ArrowLeft />
          {/* <p className="text-sm">Back</p> */}
        </div>

        <button
          className="flex cursor-pointer items-center justify-center gap-1 rounded-lg bg-blue-600 px-2 py-2 text-sm text-white transition-all ease-in hover:bg-blue-500 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600"
          onClick={handleSaveNote}
        >
          <Check /> <p>Save</p>
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
        <p className="text-center text-sm text-gray-600 dark:text-gray-200">
          Due date:{" "}
          {selectedDate
            ? `Selected: ${selectedDate.toLocaleDateString()}`
            : "Pick a day."}
        </p>
        <button
          className="my-4 w-full cursor-pointer rounded-sm border-0 bg-blue-500 py-2 text-white hover:bg-blue-600"
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
          Select due date
        </button>
      </div>
    </div>
  );
};

export default NewTask;
