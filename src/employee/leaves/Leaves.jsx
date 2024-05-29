import React, { useState } from "react";
import "./Leaves.css";

function LeavePage() {
  const [formData, setFormData] = useState({
    date: "",
    name: "",
    id: "",
    reason: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="leave-page-container">
      <div className="leave-page-header">
        <h1>Leave Application</h1>
        <div className="leave-page-sort">
          <label>Sort by:</label>
          {/* Add sorting options here */}
          {/* For example: */}
          <select>
            <option value="startDate">Start Date</option>
            <option value="endDate">End Date</option>
          </select>
        </div>
      </div>
      <form className="leave-page-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reason">Reason:</label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="apply-leave-button">
          Apply Leave
        </button>
      </form>
      <button className="back-button">Back</button>
    </div>
  );
}

export default LeavePage;
