import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";

const ManagerDashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pendingTasks, setPendingTasks] = useState(5);
  const [attendanceToday, setAttendanceToday] = useState(8);
  const [leaveRequests, setLeaveRequests] = useState(2);

  useEffect(() => {
    axios.get("http://localhost:5000/api/manager/employees/count")
      .then(response => {
        setTotalEmployees(response.data.totalEmployees);
      })
      .catch(error => {
        console.error("Error fetching employee count:", error);
        setError("Failed to fetch employee data.");
      })
      .finally(() => setLoading(false));

    // Local Storage Data
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const attendance = JSON.parse(localStorage.getItem("attendance")) || [];
    const leave = JSON.parse(localStorage.getItem("leaveRequests")) || [];

    setPendingTasks(tasks.filter(task => task.status === "Pending").length);
    setAttendanceToday(attendance.filter(record => record.status === "Present").length);
    setLeaveRequests(leave.length);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manager Dashboard</h1>
      <Sidebar role="manager" />
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div style={cardStyle}>
            <h3>Total Employees</h3>
            <p>{totalEmployees}</p>
          </div>
          <div style={cardStyle}>
            <h3>Pending Tasks</h3>
            <p>{pendingTasks}</p>
          </div>
          <div style={cardStyle}>
            <h3>Attendance Today</h3>
            <p>{attendanceToday}</p>
          </div>
          <div style={cardStyle}>
            <h3>Leave Requests</h3>
            <p>{leaveRequests}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const cardStyle = {
  background: "#f8f9fa",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  textAlign: "center",
  minWidth: "200px",
};

export default ManagerDashboard;
