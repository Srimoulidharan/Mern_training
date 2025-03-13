import React, { useEffect, useState } from "react";
import { getLeaves, updateLeaveStatus } from "../api";
import Sidebar from "../components/sidebar";

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = () => {
    getLeaves()
      .then((res) => setLeaves(res.data))
      .catch((err) => console.error("Error fetching leaves:", err));
  };

  const handleStatusChange = (id, status) => {
    updateLeaveStatus(id, status)
      .then(() => fetchLeaves()) // Refresh list after update
      .catch((err) => console.error("Error updating leave status:", err));
  };

  return (
    <div>
      <h2>Leave Management</h2>
      <Sidebar role="admin" />
      <table border="1">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id}>
              <td>{leave.employeeId.name}</td>
              <td>{leave.leaveType}</td>
              <td>{new Date(leave.startDate).toLocaleDateString()}</td>
              <td>{new Date(leave.endDate).toLocaleDateString()}</td>
              <td>{leave.status}</td>
              <td>
                {leave.status === "Pending" && (
                  <>
                    <button onClick={() => handleStatusChange(leave._id, "Approved")}>
                      ✅ Approve
                    </button>
                    <button onClick={() => handleStatusChange(leave._id, "Rejected")}>
                      ❌ Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveManagement;
