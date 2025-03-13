const mongoose = require("mongoose");
const task = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    deadline: { type: Date },
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" }
});
module.exports = mongoose.model("Task", task);
