import React, { useState } from "react";
import Header from "./components/Header";
import EmployeeList from "./components/EmployeeList";
import AssignTask from "./components/AssignTask";
import Tabs from "./components/Tabs";
import "./components/App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);

  const addEmployee = (name) => setEmployees([...employees, name]);
  const deleteEmployee = (name) =>
    setEmployees(employees.filter((employee) => employee !== name));

  const addTask = (task) => setTasks([...tasks, task]);

  const changeTaskStatus = (id, newStatus) =>
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );

  return (
    <div className="app">
      <Header />
      <EmployeeList
        employees={employees}
        addEmployee={addEmployee}
        deleteEmployee={deleteEmployee}
      />
      <AssignTask employees={employees} addTask={addTask} />
      <Tabs employees={employees} tasks={tasks} changeTaskStatus={changeTaskStatus} />
    </div>
  );
}

export default App;