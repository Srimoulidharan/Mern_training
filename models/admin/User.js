const mongoose = require("mongoose");
const user = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Admin", "Manager", "Employee"], required: true },
    department: { type: String },
    dateOfJoining: { type: Date, required: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
});
module.exports = mongoose.model("User", user);
