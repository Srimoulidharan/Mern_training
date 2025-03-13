const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
    date: {
        type: Date,  // Changed from String to Date
        required: true
    },
    status: {
        type: String,
        enum: ["Present", "Absent", "On Leave", "Late"], // Added 'Late' as per database schema
        required: true
    },
    checkInTime: {
        type: Date,  // Changed from String to Date
        default: null
    },
    checkOutTime: {
        type: Date,  // Changed from String to Date
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Attendance", attendanceSchema);
