import React, { useState } from "react";
// import axios from "./api/axios";
import axios from "axios";
import TaskBoard from "./components/TaskDashboard";

const App = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [predictedTime, setPredictedTime] = useState(null);
  const [loading, setLoading] = useState(false);

  // Auto-Completion Suggestions
  const handleTitleChange = async (e) => {
    setTitle(e.target.value);
    if (e.target.value.length > 3) {
      try {
        const res = await axios.post("http://localhost:5500/api/tasks/suggest", { input: e.target.value });
        setSuggestions(res.data.suggestions.split("\n"));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }
  };

  // Task Creation & Prediction
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5500/api/tasks/create", { title, description });
      setPredictedTime(res.data.estimatedTime);
      setTitle("");
      setDescription("");
      setSuggestions([]);
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <TaskBoard/>
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">AI-Powered Task Manager</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Task Title</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter task title"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            {/* Auto-Completion Suggestions */}
            {suggestions.length > 0 && (
              <ul className="bg-gray-50 border border-gray-200 mt-2 rounded-lg p-2">
                {suggestions.map((s, i) => (
                  <li key={i} className="text-sm text-gray-600">{s}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Task Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Task Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task details"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              rows="3"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Creating Task..." : "Create Task"}
          </button>
        </form>

        {/* Estimated Completion Time */}
        {predictedTime && (
          <div className="mt-4 p-4 bg-green-50 border border-green-300 rounded-lg text-green-700">
            <strong>Estimated Completion Time:</strong> {predictedTime} hours
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
