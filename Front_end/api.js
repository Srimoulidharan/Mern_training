import axios from "axios";
import API_BASE_URL from "./config";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT Token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle Unauthorized (401) Errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); // Remove invalid token
      window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error);
  }
);

// User API
export const loginUser = (data) => api.post("/users/login", data);
export const registerUser = (data) => api.post("/users/register", data);
export const fetchUsers = () => api.get("/users");

// Task API
export const fetchTasks = () => api.get("/tasks");
export const createTask = (data) => api.post("/tasks", data);

// Attendance API
export const markAttendance = (data) => api.post("/attendance", data);
export const getAttendance = () => api.get("/attendance");

// Leave API
export const requestLeave = (data) => api.post("/leaves", data);
export const getLeaves = () => api.get("/leaves");
export const updateLeaveStatus = (id, status) => api.put(`/leaves/${id}`, { status });

// Payroll API
export const getPayrolls = () => api.get("/payroll");
export const createPayroll = (data) => api.post("/payroll", data);
export const updatePayroll = (id, data) => api.put(`/payroll/${id}`, data);
export const deletePayroll = (id) => api.delete(`/payroll/${id}`);

export default api;
