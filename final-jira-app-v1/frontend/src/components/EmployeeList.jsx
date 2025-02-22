import React, { useState } from "react";

const EmployeeList = ({ employees, addEmployee, deleteEmployee }) => {
  const [newEmployee, setNewEmployee] = useState("");

  const handleAddEmployee = () => {
    if (newEmployee.trim()) {
      addEmployee(newEmployee.trim());
      setNewEmployee("");
    }
  };

  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      {/* <ul>
        {employees.map((employee, index) => (
          <li key={index}>
            {employee}{" "}
            <button onClick={() => deleteEmployee(employee)}>Delete</button>
          </li>
        ))}
      </ul> */}
      <input
        type="text"
        placeholder="Enter Employee Name"
        value={newEmployee}
        onChange={(e) => setNewEmployee(e.target.value)}
      />
      <button onClick={handleAddEmployee}>Add Employee</button>
    </div>
  );
};

export default EmployeeList;