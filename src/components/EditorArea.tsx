"use client";

import { useEffect, useState } from "react";
import { useTaskStore } from "@/store/useTaskStore";

export default function EditorArea() {
  const { tasks, replaceData, reset } = useTaskStore();

  const [mounted, setMounted] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    setMounted(true);
    setText(JSON.stringify(tasks, null, 2));
  }, [tasks]);

  // Update the store when the text changes (if valid JSON)
  const handleSave = () => {
    try {
      const parsed = JSON.parse(text);
      replaceData(parsed);
    } catch (error) {
      alert("Invalid JSON format!");
    }
  };

  if (!mounted) return null; // Avoid hydration warning by rendering only after mount

  return (
    <div className="mx-auto max-w-xl space-y-4 p-4">
      <h1 className="text-xl font-bold">JSON Editor</h1>

      <textarea
        className="h-64 w-full rounded border p-2 font-mono text-sm"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="space-x-2">
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white"
          onClick={handleSave}
        >
          Save Changes
        </button>
        <button
          className="rounded bg-gray-500 px-4 py-2 text-white"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
