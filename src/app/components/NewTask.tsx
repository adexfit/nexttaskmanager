import { useTaskStore } from "@/store/useTaskStore";
import { ArrowLeft, Check } from "lucide-react";

const NewTask = () => {
  const { showNewTaskPage, newTaskPage } = useTaskStore();

  const handleSaveBackMove = () => {
    showNewTaskPage(false);
  };

  return (
    <div className="mt-2 mb-2 flex cursor-pointer items-center justify-between px-8">
      <ArrowLeft onClick={handleSaveBackMove} />

      <p className="flex items-center justify-center gap-2 text-gray-500">
        <Check /> marked done
      </p>
    </div>
  );
};

export default NewTask;
