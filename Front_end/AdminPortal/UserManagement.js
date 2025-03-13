import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api"; // Ensure this API function is working
import Sidebar from "../components/sidebar";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    department: "",
    dateOfJoining: "",
  });

  useEffect(() => {
    fetchUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const newUserData = await response.json();
        setUsers([...users, newUserData]); // Update the table dynamically
        setNewUser({ name: "", email: "", password: "", role: "", department: "", dateOfJoining: "" }); // Clear form
      } else {
        console.error("Failed to add user");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <Sidebar role="admin" />

      {/* Add User Form */}
      <form onSubmit={handleSubmit} className="add-user-form">
        <input type="text" name="name" value={newUser.name} onChange={handleChange} placeholder="Name" required />
        <input type="email" name="email" value={newUser.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={newUser.password} onChange={handleChange} placeholder="Password" required />

        <select name="role" value={newUser.role} onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
        </select>

        <input type="text" name="department" value={newUser.department} onChange={handleChange} placeholder="Department" required />
        <input type="date" name="dateOfJoining" value={newUser.dateOfJoining} onChange={handleChange} required />

        <button type="submit">Add User</button>
      </form>

      {/* User Table */}
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Department</th>
            <th>Date of Joining</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.department}</td>
              <td>{new Date(user.dateOfJoining).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
