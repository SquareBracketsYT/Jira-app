import React, { useState } from "react";


const Tabs = ({ employees, tasks, changeTaskStatus }) => {
  const [activeEmployee, setActiveEmployee] = useState(null);

  const handleTabClick = (employee) => {
    setActiveEmployee(employee);
  };

  const employeeTasks = (employee) =>
    tasks.filter((task) => task.assignedTo === employee);

  const taskStatusFlow = ["Open", "Ready", "In Progress", "Done"];

  const getNextStatus = (currentStatus) => {
    const index = taskStatusFlow.indexOf(currentStatus);
    return index < taskStatusFlow.length - 1
      ? taskStatusFlow[index + 1]
      : currentStatus;
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        {employees.map((employee, index) => (
          <button
            key={index}
            className={`tab-button ${
              activeEmployee === employee ? "active" : ""
            }`}
            onClick={() => handleTabClick(employee)}
          >
            {employee}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {activeEmployee ? (
          <>
            <h2>{activeEmployee}'s Tasks</h2>
            {employeeTasks(activeEmployee).length > 0 ? (
              <ul className="task-list">
                {employeeTasks(activeEmployee).map((task, index) => (
                  <li key={index} className="task-item">
                    <strong>{task.title}</strong> <br />
                    <span>Status: {task.status}</span>

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
            ) : (
              <p>No tasks assigned to this employee.</p>
            )}
          </>
        ) : (
          <p>Select an employee to view their tasks.</p>
        )}
      </div>
    </div>
  );
};

export default Tabs;