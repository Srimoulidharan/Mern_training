const express = require("express");
const {
  requestLeave,
  getLeaveRequests,
  getLeaveRequestsByEmployee,
  updateLeaveStatus,
} = require("../../controllers/admin/leaveController");

const router = express.Router();

router.post("/", requestLeave); // Submit leave request
router.get("/", getLeaveRequests); // Get all leave requests
router.get("/:employeeId", getLeaveRequestsByEmployee); // Get leave requests by employee
router.put("/:id", updateLeaveStatus); // Approve/Reject leave request

module.exports = router;
