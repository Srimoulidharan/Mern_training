const express = require("express");
const {
  getPayrolls,
  createPayroll,
  updatePayroll,
  deletePayroll,
} = require("../../controllers/admin/payrollController");

const router = express.Router();

router.get("/", getPayrolls);
router.post("/", createPayroll);
router.put("/:id", updatePayroll);
router.delete("/:id", deletePayroll);

module.exports = router;
