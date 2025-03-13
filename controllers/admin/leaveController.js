const LeaveRequest = require("../../models/admin/LeaveRequest");

// ✅ Request a new leave
exports.requestLeave = async (req, res) => {
  try {
    const { employeeId, leaveType, startDate, endDate, reason } = req.body;

    if (!employeeId || !leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newLeave = new LeaveRequest({
      employeeId,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();
    res.status(201).json({ message: "Leave request submitted successfully", leave: newLeave });
  } catch (error) {
    res.status(500).json({ error: "Error submitting leave request" });
  }
};

// ✅ Get all leave requests (For Admin/Manager)
exports.getLeaveRequests = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find()
      .populate("employeeId", "name")
      .populate("managerId", "name"); // ✅ Added this

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: "Error fetching leave requests" });
  }
};


// ✅ Get leave requests by Employee ID
exports.getLeaveRequestsByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const leaves = await LeaveRequest.find({ employeeId });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: "Error fetching leave requests" });
  }
};

// ✅ Approve or Reject Leave Request (For Manager/Admin)
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status, managerId } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const leave = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { status, managerId },
      { new: true }
    );

    if (!leave) {
      return res.status(404).json({ error: "Leave request not found" });
    }

    res.json({ message: `Leave request ${status.toLowerCase()} successfully`, leave });
  } catch (error) {
    res.status(500).json({ error: "Error updating leave request status" });
  }
};
