import React, { useState } from "react";

const AssignTask = ({ employees, addTask }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [assignedEmployee, setAssignedEmployee] = useState("");

  const handleAssignTask = () => {
    if (taskTitle.trim() && assignedEmployee) {
      addTask({
        id: Date.now(),
        title: taskTitle.trim(),
        assignedTo: assignedEmployee,
        status: "Open",
      });
      setTaskTitle("");
      setAssignedEmployee("");
    }
  };

  return (
    <div className="assign-task">
      <h2>Assign Task</h2>
      <input
        type="text"
        placeholder="Task Title"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <select
        value={assignedEmployee}
        onChange={(e) => setAssignedEmployee(e.target.value)}
      >
        <option value="">Select Employee</option>
        {employees.map((employee, index) => (
          <option key={index} value={employee}>
            {employee}
          </option>
        ))}
      </select>
      <button onClick={handleAssignTask}>Assign Task</button>
    </div>
  );
};

export default AssignTask;