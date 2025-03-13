const mongoose = require("mongoose");
const Performance_review = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comments: { type: String },
    reviewDate: { type: Date, required: true }
});
module.exports = mongoose.model("PerformanceReview", Performance_review);
