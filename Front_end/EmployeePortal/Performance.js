import React, { useState, useEffect } from "react";
import "./Performance.css";
import Sidebar from "../components/sidebar";
const Performance = () => {
  const [performanceReviews, setPerformanceReviews] = useState([]);

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem("performanceReviews")) || [];
    setPerformanceReviews(savedReviews);
  }, []);

  return (
    <div className="performance-container">
      <h1>Performance Review</h1>
      <Sidebar role="employee" />
      {performanceReviews.length > 0 ? (
        <ul>
          {performanceReviews.map((review, index) => (
            <li key={index}>
              <p><strong>📅 Date:</strong> {review.date}</p>
              <p><strong>📊 Rating:</strong> {review.rating} ⭐</p>
              <p><strong>💬 Feedback:</strong> {review.feedback}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No performance reviews available.</p>
      )}
    </div>
  );
};

export default Performance;
