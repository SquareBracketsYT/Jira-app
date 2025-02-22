import React from "react";

const TaskBoard = ({ tasks, changeTaskStatus }) => {
  const taskStatusFlow = ["Open", "Ready", "In Progress", "Done"];

  const getNextStatus = (currentStatus) => {
    const index = taskStatusFlow.indexOf(currentStatus);
    return index < taskStatusFlow.length - 1
      ? taskStatusFlow[index + 1]
      : currentStatus;
  };

  return (
    <div className="task-board">
      <h2>Task Board</h2>
      {tasks.length === 0 ? (
        <p>No tasks assigned yet.</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className="task-item">
              <div>
                <strong>{task.title}</strong> <br />
                <span>Assigned to: {task.assignedTo}</span> <br />
                <span>Status: {task.status}</span>
              </div>
              <button
                className="w-1/2 py-3 px-4 text-white font-semibold bg-indigo-500 rounded-md focus:outline-none focus:bg-indigo-600 hover:bg-indigo-600" 
                onClick={() =>
                  changeTaskStatus(task.id, getNextStatus(task.status))
                }
              >
                Move to {getNextStatus(task.status)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskBoard;