require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/admin/userRoutes");
const taskRoutes = require("./routes/admin/taskRoutes");
// const attendanceRoutes = require("./routes/admin/attendanceRoutes");
const leaveRoutes = require("./routes/admin/leaveRoutes");
const payrollRoutes = require("./routes/admin/payrollRoutes");
const reviewRoutes = require("./routes/admin/reviewRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
// app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/reviews", reviewRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
