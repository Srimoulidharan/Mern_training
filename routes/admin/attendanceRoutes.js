const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance"); // Adjust the path as needed

// GET all attendance records
router.get("/attendances", async (req, res) => {
  try {
    const attendances = await Attendance.find();
    res.json(attendances);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
