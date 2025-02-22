import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import EmployeeList from "./components/EmployeeList";
import AssignTask from "./components/AssignTask";
import Tabs from "./components/Tabs";
import "./components/App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // const addEmployee = async (empName) => {
  //   setEmployees([...employees, empName]);
  // }

  // const addTask = (task) => setTasks([...tasks, task]);

  const changeTaskStatus = (id, newStatus) =>
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );

    useEffect(() => {
      fetch("http://localhost:5500/api/emp/empList")
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch employees");
          return response.json();
        })
        .then((data) => {
          setEmployees(data);
          console.log("Emp Data :",data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }, []);

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div id="container" className="bg-gray-100 h-screen">
      <Header />
      <div className="w-10/12 m-auto">
      <main id="main" className="flex justify-between mb-10">
        <EmployeeList/>
        <AssignTask employees={employees}/>
      </main>
      
      <Tabs employees={employees} tasks={tasks} changeTaskStatus={changeTaskStatus} />
      </div>
      
    </div>
  );
}

export default App;