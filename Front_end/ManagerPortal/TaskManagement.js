import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
const TaskManagement = () => {
  // State for tasks
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a task
  const addTask = () => {
    if (taskName.trim() === "" || assignedTo.trim() === "") {
      alert("Please enter task name and assign it to an employee.");
      return;
    }

    const newTask = {
      id: Date.now(),
      name: taskName,
      assignedTo,
      status: "Pending", // Default status
    };

    setTasks([...tasks, newTask]);
    setTaskName("");
    setAssignedTo("");
  };

  // Function to delete a task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Management</h1>
      <Sidebar role="manager"/>
      {/* Task Input Form */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Assign To"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          style={inputStyle}
        />
        <button onClick={addTask} style={buttonStyle}>
          Add Task
        </button>
      </div>

      {/* Task List */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Task</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.assignedTo}</td>
              <td>{task.status}</td> {/* Status is now plain text */}
              <td>
                <button onClick={() => deleteTask(task.id)} style={deleteButtonStyle}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Styles
const inputStyle = {
  padding: "8px",
  margin: "5px",
  width: "200px",
};

const buttonStyle = {
  padding: "8px 12px",
  margin: "5px",
  background: "blue",
  color: "white",
  border: "none",
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

const deleteButtonStyle = {
  padding: "5px 10px",
  background: "red",
  color: "white",
  border: "none",
  cursor: "pointer",
};

export default TaskManagement;
