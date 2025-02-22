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