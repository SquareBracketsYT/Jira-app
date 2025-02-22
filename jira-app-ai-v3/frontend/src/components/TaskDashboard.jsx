import React, { useEffect, useState } from "react";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5500/api/tasks/taskList") // Ensure your backend is running
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Task List
        </h2>

        <div className="grid gap-6">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
              <p className="text-gray-700 mt-2">{task.description}</p>

              {/* Conditional Rendering for Estimated Time */}
              {task.estimatedTime && (
                <p className="text-sm text-gray-500 mt-4">
                  ⏳ <strong>Estimated Time:</strong> {task.estimatedTime}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
