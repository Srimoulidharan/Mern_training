const mongoose = require("mongoose");

const PayrollSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  salary: { type: Number, required: true },
  bonus: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  netSalary: { type: Number },
  status: { type: String, enum: ["Pending", "Processed"], default: "Pending" },
  processedDate: { type: Date, default: Date.now }
});

// Auto-calculate net salary before saving
PayrollSchema.pre("save", function (next) {
  this.netSalary = this.salary + this.bonus - this.deductions;
  next();
});

module.exports = mongoose.model("Payroll", PayrollSchema);
