import { useEffect, useState } from "react";
import { getTasks, deleteTasks, addTasks, updateTask } from "../endpoints/task";
import { useMutation } from "@tanstack/react-query";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const handleGetTasks = async () => {
      try {
        const response = await getTasks(parseInt(localStorage.getItem("userId")!));
        const tasks: Task[] = response.data;
        setTasks(tasks);
      } catch (err) {
        setError("Failed to fetch tasks: " + err);
      }
    }

    handleGetTasks();
  }, []);

  const updateTaskMutation = useMutation({
    mutationFn: async ({ taskId, completed }: { taskId: number; completed: boolean }) => {
      const response = await updateTask(taskId, completed);
      return response.data;
    },
    onMutate: async ({ taskId, completed }) => {
      const previousTask = tasks.find((t) => t.id === taskId);

      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, completed } : t))
      );

      return { previousTask };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTask) {
        setTasks((prev) =>
          prev.map((t) => (t.id === context.previousTask!.id ? context.previousTask! : t))
        );
      }
      setError("Failed to update task");
    }
  });

  const toggleTask = (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      updateTaskMutation.mutate({ taskId: id, completed: !task.completed });
    }
  };

  const addTaskMutation = useMutation({
    mutationFn: async (description: string) => {
      const response = await addTasks(parseInt(localStorage.getItem("userId")!), description);
      return response.data;
    },
    onMutate: async (description) => {
      const optimisticTask: Task = {
        id: Date.now(),
        title: description,
        completed: false,
      };

      setTasks((prev) => [...prev, optimisticTask]);
      setNewTitle("");
      setError("");

      return { optimisticTask };
    },
    onSuccess: (newTask, _description, context) => {
      setTasks((prev) =>
        prev.map((t) => t.id === context?.optimisticTask.id ? newTask : t)
      );
    },
    onError: (_err, _description, context) => {
      setTasks((prev) =>
        prev.filter((t) => t.id !== context?.optimisticTask.id)
      );
      setError("Failed to add task");
    }
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId: number) => {
      const response = await deleteTasks(taskId);
      return response.data;
    },
    onMutate: async (taskId: number) => {
      const deletedTask = tasks.find((t) => t.id === taskId);

      setTasks((prev) => prev.filter((t) => t.id !== taskId));

      return { deletedTask };
    },
    onError: (_err, _taskId, context) => {
      if (context?.deletedTask) {
        setTasks((prev) => [...prev, context.deletedTask!]);
      }
      setError("Failed to delete task");
    }
  });

  const handleAddTask = () => {
    if (!newTitle.trim()) return;
    addTaskMutation.mutate(newTitle);
  }

  const handleDeleteTask = async (id: number) => {
    deleteTaskMutation.mutate(id);
  }

  return (
    <div className="bg-linear-to-br from-[#2a3c58] to-[#1e2c42] rounded-2xl p-6 shadow-2xl border border-gray-700/50">
      {/* HEADER */}
      <div className="flex items-center mb-6">
        <div className="w-3 h-8 rounded-full bg-purple-500 mr-3"></div>
        <h2 className="text-xl font-semibold text-white">My Tasks</h2>
      </div>

      {/* INPUT SECTION */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder={error ? `${error}` : "Add a new study task..."}
          className={`flex-1 rounded-xl border-0 p-3 bg-[#1e2c42] text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
            error ? "placeholder-red-400" : "placeholder-gray-400"
          }`}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        />
        <button
          onClick={handleAddTask}
          className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700 transition-all duration-200"
        >
          ADD
        </button>
      </div>

      {/* TASKS LIST */}
      <div className="space-y-3 h-46 overflow-y-auto">
        {tasks.length === 0 && (
          <div className="text-center p-8 bg-[#1e2c42]/50 rounded-xl border border-gray-700/50">
            <p className="text-gray-400 italic">No active tasks yet</p>
          </div>
        )}

        {tasks.map((task) => (
          <div
            key={task.id}
            className={`
              group flex items-center justify-between p-4 rounded-xl
              bg-[#1e2c42]/80 border border-gray-700/50
              hover:border-purple-500/50 transition-all duration-200
              ${task.completed ? "opacity-60" : ""}
            `}
          >
            {/* CHECKBOX & TEXT */}
            <label
              className="flex items-center gap-3 cursor-pointer flex-1 user-select-none"
              onClick={() => toggleTask(task.id)}
            >
              <div
                className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                ${
                  task.completed
                    ? "bg-green-500 border-green-500"
                    : "border-purple-400 bg-transparent"
                }
              `}
              >
                {task.completed && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>

              <span
                className={`font-medium transition-all ${
                  task.completed
                    ? "line-through text-gray-500"
                    : "text-gray-200"
                }`}
              >
                {task.title}
              </span>
            </label>

            {/* DELETE BUTTON (Shows on hover) */}
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-all p-2 rounded-full hover:bg-red-900/20"
              title="Delete task"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
