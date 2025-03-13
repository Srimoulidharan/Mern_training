import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
const LeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [newLeave, setNewLeave] = useState({ date: "", reason: "", status: "Pending" });

  useEffect(() => {
    const savedRequests = JSON.parse(localStorage.getItem("leaveRequests")) || [];
    setLeaveRequests(savedRequests);
  }, []);

  const handleChange = (e) => {
    setNewLeave({ ...newLeave, [e.target.name]: e.target.value });
  };

  const submitLeaveRequest = (e) => {
    e.preventDefault();
    if (!newLeave.date || !newLeave.reason) {
      alert("Please fill all fields.");
      return;
    }

    const updatedRequests = [...leaveRequests, newLeave];
    setLeaveRequests(updatedRequests);
    localStorage.setItem("leaveRequests", JSON.stringify(updatedRequests));

    setNewLeave({ date: "", reason: "", status: "Pending" });
  };

  return (
    <div className="leave-container">
      <h1>Leave Requests</h1>
      <Sidebar role="employee"/>
      <form onSubmit={submitLeaveRequest}>
        <input type="date" name="date" value={newLeave.date} onChange={handleChange} required />
        <input type="text" name="reason" value={newLeave.reason} onChange={handleChange} placeholder="Reason" required />
        <button type="submit">Submit Request</button>
      </form>
      <h2>My Leave Requests</h2>
      <ul>
        {leaveRequests.map((leave, index) => (
          <li key={index}>
            {leave.date} - {leave.reason} - <strong>{leave.status}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveRequests;
