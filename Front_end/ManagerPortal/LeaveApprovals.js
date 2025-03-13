import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
const LeaveApprovals = () => {
  // State for leave requests
  const [leaveRequests, setLeaveRequests] = useState([]);

  // Load leave requests from localStorage when component mounts
  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("leaveRequests")) || [];
    setLeaveRequests(storedRequests);
  }, []);

  // Function to update leave status
  const updateLeaveStatus = (id, status) => {
    const updatedRequests = leaveRequests.map((request) =>
      request.id === id ? { ...request, status } : request
    );
    setLeaveRequests(updatedRequests);
    localStorage.setItem("leaveRequests", JSON.stringify(updatedRequests));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Leave Management</h1>
      <Sidebar role="manager"/>
      {/* Leave Requests Table */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.length > 0 ? (
            leaveRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.employeeName}</td>
                <td>{request.leaveType}</td>
                <td>{request.fromDate}</td>
                <td>{request.toDate}</td>
                <td>{request.reason}</td>
                <td style={{ color: request.status === "Approved" ? "green" : request.status === "Rejected" ? "red" : "orange" }}>
                  {request.status}
                </td>
                <td>
                  {request.status === "Pending" && (
                    <>
                      <button onClick={() => updateLeaveStatus(request.id, "Approved")} style={approveButtonStyle}>
                        Approve
                      </button>
                      <button onClick={() => updateLeaveStatus(request.id, "Rejected")} style={rejectButtonStyle}>
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>No leave requests available</td>
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

const approveButtonStyle = {
  padding: "5px 10px",
  background: "green",
  color: "white",
  border: "none",
  cursor: "pointer",
  marginRight: "5px",
};

const rejectButtonStyle = {
  padding: "5px 10px",
  background: "red",
  color: "white",
  border: "none",
  cursor: "pointer",
};

export default LeaveApprovals;
