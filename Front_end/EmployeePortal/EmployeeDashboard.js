import React from "react";
import { Link } from "react-router-dom";
import "./EmployeeDashboard.css";
import Sidebar from "../components/sidebar";

const EmployeeDashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar role="employee" />
      <div className="dashboard-content">
        <h1 className="dashboard-title">Employee Dashboard</h1>
        <p className="dashboard-welcome">
          Welcome to your workspace! Select an option below to manage your activities.
        </p>
        
        <div className="dashboard-links">
          <Link to="/employee/tasks" className="dashboard-item" title="View and manage assigned tasks">
            📋 My Tasks
          </Link>
          <Link to="/employee/attendance" className="dashboard-item" title="Mark your daily attendance">
            📅 Mark Attendance
          </Link>
          <Link to="/employee/leave" className="dashboard-item" title="Apply for leave and track requests">
            📝 Leave Requests
          </Link>
          <Link to="/employee/payroll" className="dashboard-item" title="View salary details and payslips">
            💰 Payroll
          </Link>
          <Link to="/employee/performance" className="dashboard-item" title="Check your performance reviews">
            ⭐ Performance Review
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
