import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MarkAttendance.css";
import Sidebar from "../components/sidebar";

const MarkAttendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [employeeId] = useState("67ca86c8e2948be27cd800f9"); // Temporary employee ID for testing

    // Load Attendance History
    useEffect(() => {
        const fetchAttendanceHistory = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employee/attendance/${employeeId}`);
                setAttendance(response.data || []);  // Ensures data is an array
            } catch (error) {
                console.error("Error fetching attendance history:", error);
                setAttendance([]); // Fallback for empty data
            }
        };
        fetchAttendanceHistory();
    }, [employeeId]);

    // Check if today's attendance is already marked
    const isTodayMarked = attendance.some(entry => entry.date === new Date().toISOString().split("T")[0]);

    // Mark Attendance
    const markAttendance = async () => {
        if (isTodayMarked) {
            alert("Today's attendance is already marked.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/employee/attendance/mark", {
                employeeId,
                status: "Present"
            });

            alert(response.data.message);
            setAttendance(prevAttendance => [
                ...prevAttendance,
                { date: new Date().toISOString().split("T")[0], status: "Present" }
            ]);
        } catch (error) {
            alert(error.response?.data?.message || "Error marking attendance");
        }
    };

    // Mark Checkout
    const markCheckout = async () => {
        try {
            const response = await axios.put("http://localhost:5000/api/employee/attendance/checkout", {
                employeeId
            });

            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.message || "Error updating checkout time");
        }
    };

    return (
        <div className="attendance-container">
            <Sidebar role="employee" />
            <h1>Mark Attendance</h1>

            <div className="attendance-buttons">
                <button onClick={markAttendance} disabled={isTodayMarked}>
                    ✅ {isTodayMarked ? "Attendance Marked" : "Mark Today's Attendance"}
                </button>
                <button onClick={markCheckout}>⏳ Mark Checkout</button>
            </div>

            <h2>Attendance History:</h2>
            <ul>
                {attendance.length > 0 ? (
                    attendance.map((entry, index) => (
                        <li key={index}>
                            📅 {entry.date} — {entry.status}
                        </li>
                    ))
                ) : (
                    <p>No attendance records found.</p>
                )}
            </ul>
        </div>
    );
};

export default MarkAttendance;
