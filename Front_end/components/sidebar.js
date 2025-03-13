import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = ({ role = "guest" }) => {
  const [isOpen, setIsOpen] = useState(true);
  const normalizedRole = role.toLowerCase(); // Convert to lowercase

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const menus = {
    admin: [
      { path: "/admin", label: "Dashboard" },
      { path: "/admin/users", label: "User Management" },
      { path: "/admin/roles", label: "Role Management" },
      { path: "/admin/attendance", label: "Attendance Tracking" },
      { path: "/admin/leave", label: "Leave Management" },
      { path: "/admin/payroll", label: "Payroll Management" },
      { path: "/admin/reports", label: "Reports & Analytics" },
        ],
    manager: [
      { path: "/manager", label: "Dashboard" },
      { path: "/manager/tasks", label: "Task Management" },
      { path: "/manager/performance", label: "Employee Performance" },
      { path: "/manager/leave", label: "Leave Approvals" },
      { path: "/manager/attendance", label: "Attendance Reports" },
      { path: "/manager/reports", label: "ReportsAnalyticsManager" },
    ],
    employee: [
      { path: "/employee", label: "Dashboard" },
      { path: "/employee/tasks", label: "My Tasks" },
      { path: "/employee/attendance", label: "Mark Attendance" },
      { path: "/employee/leave", label: "Leave Requests" },
      { path: "/employee/payroll", label: "Payroll" },
      { path: "/employee/performance", label: "Performance Review" },
    ],
  };

  return (
    <div className={`main-container ${isOpen ? "sidebar-open" : ""}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? "☰ Close" : "☰ Open"}
      </button>

      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <h2>{normalizedRole.charAt(0).toUpperCase() + normalizedRole.slice(1)} Panel</h2>
        {menus[normalizedRole] ? (
          menus[normalizedRole].map((menu, index) => (
            <Link key={index} to={menu.path} className="menu-item">
              {menu.label}
            </Link>
          ))
        ) : (
          <p>No menu available</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
