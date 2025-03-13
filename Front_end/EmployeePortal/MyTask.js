import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyTask.css";
import Sidebar from "../components/sidebar";

const MyTask = () => {
  const [tasks, setTasks] = useState([]);
  const employeeId = "67cbcc59a920ccb55624c157"; // Example ID for testing

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tasks/employee/${employeeId}`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateTaskStatus = async (taskId) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}/status`, { status: "Completed" });
      fetchTasks(); // Refresh the task list after updating
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="task-container">
      <h1>My Tasks</h1>
      <Sidebar role="employee"/>
      {tasks.length === 0 ? (
        <p>No tasks assigned.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              {task.title} - {task.status}
              {task.status !== "Completed" && (
                <button onClick={() => updateTaskStatus(task._id)}>Mark as Done</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyTask;
