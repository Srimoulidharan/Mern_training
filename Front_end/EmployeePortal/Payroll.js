import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
const Payroll = () => {
  const [salaryDetails, setSalaryDetails] = useState(null);

  useEffect(() => {
    const savedSalary = JSON.parse(localStorage.getItem("salaryDetails")) || {
      basic: 50000,
      bonus: 5000,
      deductions: 2000,
    };
    setSalaryDetails(savedSalary);
  }, []);

  return (
    <div className="payroll-container">
      <h1>Payroll Details</h1>
      <Sidebar role="employee"/>
      {salaryDetails ? (
        <div>
          <p>💰 Basic Salary: ₹{salaryDetails.basic}</p>
          <p>🎁 Bonus: ₹{salaryDetails.bonus}</p>
          <p>📉 Deductions: ₹{salaryDetails.deductions}</p>
          <h2>💵 Net Pay: ₹{salaryDetails.basic + salaryDetails.bonus - salaryDetails.deductions}</h2>
        </div>
      ) : (
        <p>No payroll data available.</p>
      )}
    </div>
  );
};

export default Payroll;
