import { useEffect, useState } from "react";

function App() {
  const [task, setTask] = useState("");

  // Load saved tasks from the browser
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("todoTasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Save tasks whenever the task list changes
  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (task.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  // Allow Enter key to add a task
  const handleKeyDown = e => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  // Mark task as Done / Not Done
  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  // Delete one task
  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  // Delete all tasks
  const clearAllTasks = () => {
    setTasks([]);
  };

  // Count completed tasks
  const completedTasks = tasks.filter(
    (item) => item.completed
  ).length;

  // Count remaining tasks
  const remainingTasks = tasks.length - completedTasks;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
            My To-Do List
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Organize your tasks and stay productive
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl bg-white p-4 shadow-xl sm:p-6">

          {/* Add Task */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Enter a new task…"
              value={task}
              onChange={e => setTask(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />

            <button
              onClick={addTask}
              className="w-full rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700 sm:w-auto"
            >
              Add Task
            </button>
          </div>

          {/* Task Summary */}
          <div className="mb-6 grid grid-cols-3 gap-3">

            <div className="rounded-xl bg-blue-50 p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {tasks.length}
              </p>

              <p className="text-sm text-gray-500">
                Total
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {completedTasks}
              </p>

              <p className="text-sm text-gray-500">
                Done
              </p>
            </div>

            <div className="rounded-xl bg-orange-50 p-4 text-center">
              <p className="text-2xl font-bold text-orange-600">
                {remainingTasks}
              </p>

              <p className="text-sm text-gray-500">
                Remaining
              </p>
            </div>

          </div>

          {/* Task Header */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <h2 className="text-xl font-bold text-gray-800">
              My Tasks
            </h2>

            {tasks.length > 0 && (
              <button
                onClick={clearAllTasks}
                className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-200"
              >
                Clear All
              </button>
            )}

          </div>

          {/* Task List */}
          <div className="space-y-3">

            {tasks.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center">
                <p className="text-gray-500">
                  No tasks yet.
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Add a task above to get started.
                </p>
              </div>
            ) : (
              tasks.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                >

                  {/* Task Name */}
                  <span
                    className={`break-words font-medium ${
                      item.completed
                        ? "text-gray-400 line-through"
                        : "text-gray-800"
                    }`}
                  >
                    {item.text}
                  </span>

                  {/* Buttons */}
                  <div className="flex w-full gap-2 sm:w-auto">

                    <button
                      onClick={() => toggleTask(item.id)}
                      className={`flex-1 rounded-lg px-4 py-2 font-semibold text-white sm:flex-none ${
                        item.completed
                          ? "bg-gray-500 hover:bg-gray-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {item.completed
                        ? "Not Done"
                        : "Done"}
                    </button>

                    <button
                      onClick={() => deleteTask(item.id)}
                      className="flex-1 rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600 sm:flex-none"
                    >
                      Delete
                    </button>

                  </div>
                </div>
              ))
            )}

          </div>
        </div>

        {/* User Guide */}
        <div className="mt-6 rounded-2xl bg-white p-5 shadow">

          <h2 className="mb-3 text-xl font-bold text-gray-800">
            User Guide
          </h2>

          <ul className="space-y-2 text-gray-600">
            <li>• Enter your task in the input box.</li>
            <li>• Click Add Task or press Enter.</li>
            <li>• Click Done when a task is completed.</li>
            <li>• Click Not Done to mark it incomplete again.</li>
            <li>• Click Delete to remove a task.</li>
            <li>• Click Clear All to remove all tasks.</li>
          </ul>

        </div>

      </div>
    </div>
  );
}

export default App;