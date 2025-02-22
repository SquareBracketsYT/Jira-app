import React, { useState } from "react";
import axios from "axios";

const AssignTask = ({ employees }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [assignedEmployee, setAssignedEmployee] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [predictedTime, setPredictedTime] = useState(null);
  const [loading, setLoading] = useState(false);

  // Auto-Completion Suggestions
  const handleTitleChange = async (e) => {
    setTaskTitle(e.target.value);
    if (e.target.value.length > 3) {
      try {
        const res = await axios.post("http://localhost:5500/api/tasks/suggest", { input: e.target.value });
        setSuggestions(res.data.suggestions.split("\n"));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }
  };

  const handleAssignTask = async (e) => {
    // if (taskTitle.trim() && assignedEmployee) {
    //   addTask({
    //     id: Date.now(),
    //     title: taskTitle.trim(),
    //     assignedTo: assignedEmployee,
    //     status: "Open",
    //   });
    //   setTaskTitle("");
    //   setAssignedEmployee("");
    // }
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5500/api/tasks/create", { taskTitle, taskDesc, assignedEmployee });
      setPredictedTime(res.data.estimatedTime);
      setTaskTitle("");
      setTaskDesc("");
      setAssignedEmployee("");
      setSuggestions([]);
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assign-task bg-white w-7/12 shadow-md rounded p-5 pt-8">
      <h2 className="text-3xl mb-4 font-semibold text-center">Assign Task</h2>

      <div className="input-group mb-4">
        <label className="block">Enter Task Title</label>
        <input
          type="text"
          className="border mt-1 p-2 border-gray-300 focus:border-indigo-500 w-full"
          placeholder="Task Title"
          value={taskTitle}
          onChange={handleTitleChange}
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

      <div className="input-group mb-4">
        <label className="block">Enter Task Description</label>
        <textarea
          className="border mt-1 p-2 border-gray-300 focus:border-indigo-500 w-full"
          placeholder="Enter Task Description"
          value={taskDesc}
          onChange={(e) => setTaskDesc(e.target.value)}
        />
      </div>

      <div className="input-group mb-4">
        <label className="block">Select Employee</label>
        <select
          className="border mt-1 p-2 border-gray-300 focus:border-indigo-500 w-full"
          value={assignedEmployee}
          onChange={(e) => setAssignedEmployee(e.target.value)}
        >
        <option value="">Select Employee</option>
          {/* {employees.map((employee, index) => (
            <option key={index} value={employee}>
              {employee}
            </option>
          ))} */}
          {employees.map((emp) => (
            <option value={emp.empName} key={emp.empId}>
                {emp.empName}
            </option>
          ))}
      </select>
      </div>      

      
      <div className="btn-group text-center">
      <button 
          className="w-1/2 py-3 px-4 text-white font-semibold bg-indigo-500 rounded-md focus:outline-none focus:bg-indigo-600 hover:bg-indigo-600" 
          onClick={handleAssignTask}
          disabled={loading}
          >
            {loading ? "Creating Task..." : "Assign Task"}
        </button>

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

export default AssignTask;