import React, { useState } from "react";
import "./EmployeePerformance.css"; // Add a CSS file for styling
import Sidebar from "../components/sidebar";
const EmployeePerformance = () => {
  // Sample employee performance data (stored in state)
  const [employees] = useState([
    { id: 1, name: "John Doe", tasksCompleted: 25, attendance: "95%", rating: 4.8 },
    { id: 2, name: "Jane Smith", tasksCompleted: 18, attendance: "90%", rating: 4.5 },
    { id: 3, name: "Mike Johnson", tasksCompleted: 30, attendance: "98%", rating: 4.9 },
    { id: 4, name: "Emma Brown", tasksCompleted: 20, attendance: "85%", rating: 4.3 },
  ]);

  return (
    <div className="performance-container">
      <h1>Employee Performance</h1>
      <Sidebar role="manager"></Sidebar>
      <table className="performance-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Tasks Completed</th>
            <th>Attendance</th>
            <th>Performance Rating</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.tasksCompleted}</td>
              <td>{employee.attendance}</td>
              <td>{employee.rating} ⭐</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeePerformance;
