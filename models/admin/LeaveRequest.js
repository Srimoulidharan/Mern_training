const mongoose = require("mongoose");

const leaveRequestSchema = new mongoose.Schema(
  {
    employeeId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    managerId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      default: null 
    },
    leaveType: { 
      type: String, 
      enum: ["Sick Leave", "Casual Leave"], 
      required: true 
    },
    startDate: { 
      type: Date, 
      required: true,
      validate: {
        validator: function (value) {
          return this.endDate ? value <= this.endDate : true;
        },
        message: "Start date must be before or equal to the end date.",
      },
    },
    endDate: { 
      type: Date, 
      required: true 
    },
    status: { 
      type: String, 
      enum: ["Pending", "Approved", "Rejected"], 
      default: "Pending" 
    },
    reason: { 
      type: String, 
      required: true 
    }
  },
  { timestamps: true } 
);

module.exports = mongoose.model("LeaveRequest", leaveRequestSchema);
