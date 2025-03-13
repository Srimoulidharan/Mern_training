import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
const RoleManagement = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        console.log("Sending Role Update Request:", { userId, newRole });

        try {
            const response = await axios.put("http://localhost:5000/api/users/update-role", {
                userId,
                newRole,
            });

            console.log("Role Update Response:", response.data);

            setUsers(users.map(user => 
                user._id === userId ? { ...user, role: newRole } : user
            ));
        } catch (error) {
            console.error("Error updating role:", error.response?.data || error.message);
        }
    };

    return (
        <div>
            <h2>Role Management</h2>
            <Sidebar role="admin"/>
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Update Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <select
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                >
                                    <option value="Admin">Admin</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Employee">Employee</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RoleManagement;
