const mongoose = require("mongoose");
const Attendance = require("../../models/admin/Attendance");

exports.markAttendance = async (req, res) => {
    try {
        const { employeeId, date, status, checkInTime, checkOutTime } = req.body;

        if (!employeeId || !mongoose.Types.ObjectId.isValid(employeeId)) {
            return res.status(400).json({ error: "Invalid or missing employee ID" });
        }

        // Ensure date is stored as Date object
        const formattedDate = new Date(date).setHours(0, 0, 0, 0);

        // Check if attendance already exists for this employee on this date
        const existingAttendance = await Attendance.findOne({ employeeId, date: formattedDate });
        if (existingAttendance) {
            return res.status(400).json({ error: "Attendance already marked for this date." });
        }

        const attendance = new Attendance({
            employeeId,
            date: formattedDate,
            status,
            checkInTime: checkInTime ? new Date(checkInTime) : null,
            checkOutTime: checkOutTime ? new Date(checkOutTime) : null,
        });

        await attendance.save();
        res.status(201).json(attendance);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while marking attendance: " + error.message });
    }
};

exports.getAttendance = async (req, res) => {
    try {
        const records = await Attendance.find().populate("employeeId", "name");

        // Filter out null employee references
        const validRecords = records.filter(record => record.employeeId);

        if (validRecords.length === 0) {
            return res.status(404).json({ message: "No attendance records found." });
        }

        res.json(validRecords);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
