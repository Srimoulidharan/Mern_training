import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
const ReportsAnalyticsManager = () => {
  const [reports, setReports] = useState([]);
  useEffect(() => {
    const storedReports = JSON.parse(localStorage.getItem("employeeReports")) || [
      { employeeName: "John Doe", completedTasks: 8, totalTasks: 10, attendance: "90%" },
      { employeeName: "Jane Smith", completedTasks: 5, totalTasks: 7, attendance: "85%" },
      { employeeName: "Mark Wilson", completedTasks: 10, totalTasks: 12, attendance: "95%" },
    ];
    setReports(storedReports);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Reports & Analytics</h1>
      <Sidebar role="manager"/>
      {/* Reports Table */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Completed Tasks</th>
            <th>Total Tasks</th>
            <th>Task Completion (%)</th>
            <th>Attendance Rate</th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map((report, index) => {
              const completionRate = ((report.completedTasks / report.totalTasks) * 100).toFixed(2);
              return (
                <tr key={index}>
                  <td>{report.employeeName}</td>
                  <td>{report.completedTasks}</td>
                  <td>{report.totalTasks}</td>
                  <td style={{ color: completionRate >= 80 ? "green" : "red" }}>{completionRate}%</td>
                  <td>{report.attendance}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>No report data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Styles
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

export default ReportsAnalyticsManager;
