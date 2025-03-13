import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api";
import Sidebar from "../components/sidebar";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [adminName, setAdminName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  useEffect(() => {
    fetchUsers()
      .then((res) => {
        const uniqueUsers = res.data.reduce((acc, user) => {
          if (!acc.some((u) => u.email === user.email)) {
            acc.push(user);
          }
          return acc;
        }, []);
        setUsers(uniqueUsers);

        // Get the logged-in admin user from localStorage
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (loggedInUser) {
          setAdminName(loggedInUser.name);
        }
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Filtered Users (Search + Role Filter)
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role.toLowerCase() === filterRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

  return (
    <div style={styles.container}>
      <Sidebar role="admin" />
      <div style={styles.content}>
        <h1>Welcome, {adminName} 👋</h1>
        <h2>Admin Dashboard</h2>

        {/* Search and Filter Controls */}
        <div style={styles.controls}>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.input}
          />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            style={styles.select}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        <h3>All Users</h3>
        <ul style={styles.userList}>
          {filteredUsers.map((user) => (
            <li key={user._id} style={styles.userItem}>
              {user.name} - {user.role} -{" "}
              {user.email.includes("@") ? user.email : <span style={styles.invalidEmail}>Invalid Email</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Inline Styling for Better UI
const styles = {
  container: { display: "flex", minHeight: "100vh" },
  content: { padding: "20px", flex: 1 },
  controls: { display: "flex", gap: "10px", marginBottom: "15px" },
  input: { padding: "8px", width: "200px" },
  select: { padding: "8px", width: "150px" },
  userList: { listStyle: "none", padding: 0 },
  userItem: { padding: "5px 0", borderBottom: "1px solid #ddd" },
  invalidEmail: { color: "red", fontWeight: "bold" },
};

export default AdminDashboard;
