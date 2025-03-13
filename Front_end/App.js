import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./LandingPage/LandingPage";
import LoginPage from "./LoginPortal/LoginPage";
import AdminDashboard from "./AdminPortal/AdminDashboard";
import UserManagement from "./AdminPortal/UserManagement";
import RoleManagement from "./AdminPortal/RoleManagement";
import Attendance from "./AdminPortal/Attendance";
import LeaveManagement from "./AdminPortal/LeaveManagement";
import PayrollManagement from "./AdminPortal/PayrollManagement";
import ReportsAnalytics from "./AdminPortal/ReportsAnalytics";
// Employee Pages
import EmployeeDashboard from "./EmployeePortal/EmployeeDashboard";
import MarkAttendance from "./EmployeePortal/MarkAttendance";
import MyTask from "./EmployeePortal/MyTask";
import Performance from "./EmployeePortal/Performance";
import LeaveRequests from "./EmployeePortal/LeaveRequests";
import Payroll from "./EmployeePortal/Payroll";

// Manager Pages
import ManagerDashboard from "./ManagerPortal/ManagerDashboard";
import EmployeePerformance from "./ManagerPortal/EmployeePerformance";
import LeaveApprovals from "./ManagerPortal/LeaveApprovals";
import TaskManagement from "./ManagerPortal/TaskManagement";
import ReportsAnalyticsManager from "./ManagerPortal/ReportsAnalyticsManager";
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/roles" element={<RoleManagement />} />
        <Route path="/admin/attendance" element={<Attendance />} />
        <Route path="/admin/leave" element={<LeaveManagement role="admin" />} />
        <Route path="/admin/payroll" element={<PayrollManagement role="admin" />} />
        <Route path="/admin/reports" element={<ReportsAnalytics />} />
        {/* Employee Routes */}
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/employee/attendance" element={<MarkAttendance />} />
        <Route path="/employee/tasks" element={<MyTask />} />
        <Route path="/employee/performance" element={<Performance />} />
        <Route path="/employee/leave" element={<LeaveRequests role="employee" />} />
        <Route path="/employee/payroll" element={<Payroll role="employee" />} />
        {/* Manager Routes */}
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/manager/performance" element={<EmployeePerformance />} />
        <Route path="/manager/leave" element={<LeaveApprovals role="manager"/>} />
        <Route path="/manager/tasks" element={<TaskManagement />} />
        <Route path="/manager/attendance" element={<MarkAttendance />} />
        <Route path="/manager/reports" element={<ReportsAnalyticsManager />} />

      </Routes>
    </Router>
  );
}

export default App;
