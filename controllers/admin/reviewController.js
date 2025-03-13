const PerformanceReview = require("../../models/admin/PerformanceReview");
const User = require("../../models/admin/User");

// Get all performance reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await PerformanceReview.find()
      .populate("employeeId", "name")
      .populate("managerId", "name");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new performance review
exports.createReview = async (req, res) => {
  try {
    const { employeeId, managerId, rating, comments, reviewDate } = req.body;

    const employee = await User.findById(employeeId);
    const manager = await User.findById(managerId);
    if (!employee || !manager) return res.status(404).json({ message: "Employee or Manager not found" });

    const newReview = new PerformanceReview({
      employeeId,
      managerId,
      rating,
      comments,
      reviewDate,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a performance review
exports.updateReview = async (req, res) => {
  try {
    const updatedReview = await PerformanceReview.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReview) return res.status(404).json({ message: "Review not found" });

    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a performance review
exports.deleteReview = async (req, res) => {
  try {
    const deletedReview = await PerformanceReview.findByIdAndDelete(req.params.id);
    if (!deletedReview) return res.status(404).json({ message: "Review not found" });

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
