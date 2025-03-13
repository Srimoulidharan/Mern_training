import React, { useEffect, useState } from "react";
import { getPayrolls, createPayroll, updatePayroll, deletePayroll } from "../api";
import Sidebar from "../components/sidebar";

const PayrollPage = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [formData, setFormData] = useState({
    employee: "",
    salary: "",
    bonus: "",
    deductions: "",
  });
  const [editingId, setEditingId] = useState(null); // Track editing state

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const fetchPayrolls = async () => {
    try {
      const res = await getPayrolls();
      setPayrolls(res.data);
    } catch (error) {
      console.error("Error fetching payrolls:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updatePayroll(editingId, formData);
      } else {
        await createPayroll(formData);
      }
      fetchPayrolls();
      setFormData({ employee: "", salary: "", bonus: "", deductions: "" });
      setEditingId(null);
    } catch (error) {
      console.error("Error submitting payroll:", error);
    }
  };

  const handleEdit = (payroll) => {
    setFormData({
      employee: payroll.employeeId?.name || "",
      salary: payroll.salary,
      bonus: payroll.bonus,
      deductions: payroll.deductions,
    });
    setEditingId(payroll._id);
  };

  const handleDelete = async (id) => {
    try {
      await deletePayroll(id);
      fetchPayrolls();
    } catch (error) {
      console.error("Error deleting payroll:", error);
    }
  };

  return (
    <div className="payroll-container">
      <Sidebar role="admin" />
      <h2>Payroll Management</h2>

      {/* Add/Edit Payroll Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="employee"
          placeholder="Employee Name"
          value={formData.employee}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="bonus"
          placeholder="Bonus"
          value={formData.bonus}
          onChange={handleChange}
        />
        <input
          type="number"
          name="deductions"
          placeholder="Deductions"
          value={formData.deductions}
          onChange={handleChange}
        />
        <button type="submit">{editingId ? "Update Payroll" : "Add Payroll"}</button>
      </form>

      {/* Payroll Table */}
      <table border="1">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Bonus</th>
            <th>Deductions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.map((payroll) => (
            <tr key={payroll._id}>
              <td>{payroll.employeeId?.name || "Unknown"}</td>
              <td>{payroll.employeeId?.email || "No Email"}</td>
              <td>{payroll.salary}</td>
              <td>{payroll.bonus}</td>
              <td>{payroll.deductions}</td>
              <td>
                <button onClick={() => handleEdit(payroll)}>Edit</button>
                <button onClick={() => handleDelete(payroll._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollPage;
