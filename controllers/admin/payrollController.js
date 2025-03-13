const Payroll = require("../../models/admin/Payroll");
const User = require("../../models/admin/User"); 

// Get all payroll records
exports.getPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find().populate("employeeId", "name email");
    res.json(payrolls);
  } catch (err) {
    console.error("Error fetching payroll records:", err);
    res.status(500).json({ error: "Error fetching payroll records" });
  }
};

// Create a new payroll record
exports.createPayroll = async (req, res) => {
  try {
    const { employee, salary, bonus, deductions } = req.body;

    if (!employee || !salary) {
      return res.status(400).json({ error: "Employee Name and Salary are required" });
    }

    // Find employee by name
    const user = await User.findOne({ name: employee });

    console.log("Employee Found:", user); // Log employee details

    if (!user) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Use the found employee's ObjectId
    const payroll = new Payroll({
      employeeId: user._id,
      salary,
      bonus: bonus || 0, // Default bonus to 0 if not provided
      deductions: deductions || 0, // Default deductions to 0 if not provided
    });

    await payroll.save();
    res.status(201).json({ message: "Payroll created successfully", payroll });

  } catch (err) {
    console.error("Error creating payroll:", err);
    res.status(500).json({ error: "Error creating payroll record" });
  }
};

// Update payroll record
exports.updatePayroll = async (req, res) => {
  try {
    const { id } = req.params;
    const { salary, bonus, deductions, status } = req.body;

    const payroll = await Payroll.findByIdAndUpdate(
      id,
      { salary, bonus, deductions, status },
      { new: true }
    );

    if (!payroll) {
      return res.status(404).json({ error: "Payroll record not found" });
    }

    res.json({ message: "Payroll updated successfully", payroll });
  } catch (err) {
    console.error("Error updating payroll:", err);
    res.status(500).json({ error: "Error updating payroll record" });
  }
};

// Delete payroll record
exports.deletePayroll = async (req, res) => {
  try {
    const { id } = req.params;
    const payroll = await Payroll.findByIdAndDelete(id);

    if (!payroll) {
      return res.status(404).json({ error: "Payroll record not found" });
    }

    res.json({ message: "Payroll deleted successfully" });
  } catch (err) {
    console.error("Error deleting payroll:", err);
    res.status(500).json({ error: "Error deleting payroll record" });
  }
};
