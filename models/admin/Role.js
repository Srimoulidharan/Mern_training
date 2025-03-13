const mongoose = require("mongoose");
const Role = new mongoose.Schema({
    roleName: { type: String, required: true, unique: true },
    permissions: { type: [String], required: true }
});
module.exports = mongoose.model("Role", Role);
