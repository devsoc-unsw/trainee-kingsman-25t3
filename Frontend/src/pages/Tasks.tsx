import { useState } from "react";
// We'll use a simple random ID for now since we don't have the backend 'uuid' package installed yet
// and I cannot install it for you.
const generateId = () => Math.random().toString(36).substr(2, 9);

type Task = {
    id: string;
    title: string;
    completed: boolean;
};

export default function Tasks() {
    // 1. STATE: We hold the tasks in memory for now.
    const [tasks, setTasks] = useState<Task[]>([
        { id: "1", title: "Complete the Frontend Logic", completed: false },
        { id: "2", title: "Review React Components", completed: true },
    ]);
    const [newTitle, setNewTitle] = useState("");

    // 2. HANDLERS: Add, Toggle, Delete
    const addTask = () => {
        if (!newTitle.trim()) return;
        const newTask: Task = {
            id: generateId(),
            title: newTitle.trim(),
            completed: false
        };
        setTasks((prev) => [...prev, newTask]);
        setNewTitle("");
    };

    const toggleTask = (id: string) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
        );
    };

    const deleteTask = (id: string) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    // 3. RENDER: The UI
    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#005fbf] to-[#e0f7ff] p-6 font-sans text-slate-800">

            {/* HEADER */}
            <h1 className="text-4xl font-extrabold mb-8 text-white drop-shadow-md tracking-tight">
                My Tasks
            </h1>

            {/* INPUT SECTION */}
            <div className="flex w-full max-w-xl gap-3 mb-10">
                <input
                    type="text"
                    placeholder="Add a new study task..."
                    className="flex-1 rounded-xl border-0 p-4 shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-400 text-lg"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTask()}
                />
                <button
                    onClick={addTask}
                    className="rounded-xl bg-purple-600 px-6 py-3 font-bold text-white shadow-lg hover:bg-purple-700 hover:scale-105 transition-all duration-200"
                >
                    ADD
                </button>
            </div>

            {/* TASKS LIST */}
            <ul className="w-full max-w-xl space-y-4">
                {tasks.length === 0 && (
                    <div className="text-center p-8 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 text-white">
                        <p className="text-xl italic">No active tasks. Time to relax? 🏝️</p>
                    </div>
                )}

                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className={`
              group flex items-center justify-between p-5 rounded-2xl
              bg-white/80 backdrop-blur-sm border border-white/50
              shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300
              ${task.completed ? "opacity-60 bg-gray-100/50" : ""}
            `}
                    >
                        {/* CHECKBOX & TEXT */}
                        <label
                            className="flex items-center gap-4 cursor-pointer flex-1 user-select-none"
                            onClick={() => toggleTask(task.id)}
                        >
                            <div className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                ${task.completed ? "bg-green-500 border-green-500" : "border-purple-400 bg-white"}
              `}>
                                {task.completed && (
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>

                            <span className={`text-xl font-medium transition-all ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                                {task.title}
                            </span>
                        </label>

                        {/* DELETE BUTTON (Shows on hover) */}
                        <button
                            onClick={() => deleteTask(task.id)}
                            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-2 rounded-full hover:bg-red-50"
                            title="Delete task"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
