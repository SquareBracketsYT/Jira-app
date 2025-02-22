import React, { useState } from "react";
import axios from "axios";

const EmployeeList = () => {
  const [empId, setEmpId] = useState("");
  const [empName, setEmpName] = useState("");
  const [empSkills, setEmpSkills] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5500/api/emp/create", { empId, empName, empSkills });
      setEmpId("");
      setEmpName("");
      setEmpSkills("");
    } catch (error) {
      console.error("Error creating new emp:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="employee-list bg-white shadow-md rounded p-5 pt-8 w-1/3">
      <h2 className="text-3xl mb-4 font-semibold text-center">Add Employee</h2>
      
      <div className="input-group mb-4">
        <label className="block">Enter Emp ID</label>
        <input
          type="text"
          className="border mt-1 p-2 border-gray-300 focus:border-indigo-500 w-full"
          placeholder="Enter Employee ID"
          value={empId}
          onChange={(e) => setEmpId(e.target.value)}
        />
      </div>

      <div className="input-group mb-4">
        <label className="block">Enter Emp Name</label>
        <input
          type="text"
          className="border mt-1 p-2 border-gray-300 focus:border-indigo-500 w-full"
          placeholder="Enter Employee Name"
          value={empName}
          onChange={(e) => setEmpName(e.target.value)}
        />
      </div>

      <div className="input-group mb-4">
        <label className="block">Enter Emp Skills</label>
        <input
          type="text"
          className="border mt-1 p-2 border-gray-300 focus:border-indigo-500 w-full"
          placeholder="Enter Employee Skills"
          value={empSkills}
          onChange={(e) => setEmpSkills(e.target.value)}
        />
      </div>
      
      <div className="btn-group text-center">
        <button 
          className="w-1/2 py-3 px-4 text-white font-semibold bg-indigo-500 rounded-md focus:outline-none focus:bg-indigo-600 hover:bg-indigo-600" 
          onClick={handleAddEmployee}
          disabled={loading}
          >
            {loading ? "Creating Emp..." : "Add Employee"}
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;