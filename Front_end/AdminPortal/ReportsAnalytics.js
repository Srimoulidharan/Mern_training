import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import Sidebar from "../components/sidebar";
import { getPayrolls, getAttendance, getLeaves } from "../api"; // Import API functions

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ReportsAnalytics = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);

  useEffect(() => {
    // Fetch Payroll Data
    getPayrolls()
      .then((res) => setPayrollData(res.data))
      .catch((err) => console.error("Error fetching payroll data:", err));

    // Fetch Attendance Data
    getAttendance()
      .then((res) => setAttendanceData(res.data))
      .catch((err) => console.error("Error fetching attendance data:", err));

    // Fetch Leave Data
    getLeaves()
      .then((res) => setLeaveData(res.data))
      .catch((err) => console.error("Error fetching leave data:", err));
  }, []);

  // Function to calculate net salary correctly
  const getNetSalary = (record) => {
    const salary = Number(record.salary) || 0;
    const bonus = Number(record.bonus) || 0;
    const deductions = Number(record.deductions) || 0;
    return salary + bonus - deductions;
  };

  // Calculate total payroll expenses
  const totalPayroll = payrollData.reduce(
    (acc, record) => acc + getNetSalary(record),
    0
  );

  // Employee Attendance Report
  const attendanceReport = attendanceData.reduce((acc, record) => {
    const employeeName = record.employeeId?.name || "Unknown";
    acc[employeeName] =
      (acc[employeeName] || 0) + (record.status === "Present" ? 1 : 0);
    return acc;
  }, {});

  // Leave Report
  const leaveReport = leaveData.reduce((acc, record) => {
    const employeeName = record.employeeId?.name || "Unknown";
    acc[employeeName] = (acc[employeeName] || 0) + 1;
    return acc;
  }, {});

  // Chart Data
  const attendanceChartData = {
    labels: Object.keys(attendanceReport),
    datasets: [
      {
        label: "Days Present",
        data: Object.values(attendanceReport),
        backgroundColor: "blue",
      },
    ],
  };

  const leaveChartData = {
    labels: Object.keys(leaveReport),
    datasets: [
      {
        label: "Leave Taken",
        data: Object.values(leaveReport),
        backgroundColor: "red",
      },
    ],
  };

  return (
    <div>
      <h1>Reports & Analytics</h1>
      <Sidebar role="admin" />

      {/* Payroll Report */}
      <h2> Payroll Report</h2>
      <p>
        <strong>Total Payroll Expenses:</strong> ${totalPayroll.toFixed(2)}
      </p>
      <table border="1">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Basic Salary</th>
            <th>Bonuses</th>
            <th>Deductions</th>
            <th>Net Salary</th>
          </tr>
        </thead>
        <tbody>
          {payrollData.map((record) => (
            <tr key={record._id}>
              <td>{record.employeeId?.name || "Unknown"}</td>
              <td>${Number(record.salary).toFixed(2)}</td>
              <td>${Number(record.bonus).toFixed(2)}</td>
              <td>${Number(record.deductions).toFixed(2)}</td>
              <td>${getNetSalary(record).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Attendance Report */}
      <h2> Attendance Report</h2>
      <Bar data={attendanceChartData} />

      {/* Leave Report */}
      <h2> Leave Report</h2>
      <Pie data={leaveChartData} />
    </div>
  );
};

export default ReportsAnalytics;
