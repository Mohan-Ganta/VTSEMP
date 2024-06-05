import React, { useState, useEffect } from "react";
import "./Leaves.css";
import axios from "axios";

function LeavePage() {
  const [formData, setFormData] = useState({
    date: "", // We'll automatically set this in the backend
    name: "",
    id: "",
    reason: "",
    status: "", // By default, this will be pending
  });
  const [leaveData, setLeaveData] = useState([]);

  useEffect(() => {
    // Fetch leave data for the current employee on component mount
    fetchLeaveData();
  }, []);

  const fetchLeaveData = async () => {
    try {
      // Fetch the leave data for the current employee
      const response = await axios.get(
        "https://vtsemp-back.onrender.com/leave"
      );
      setLeaveData(response.data);
    } catch (error) {
      console.error("Error fetching leave data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the leave application data to the backend
      const response = await axios.post(
        "https://vtsemp-back.onrender.com/leave",
        formData
      );
      console.log(response.data); // Log the response from the server
      // After submitting leave application, fetch updated leave data
      fetchLeaveData();
    } catch (error) {
      console.error("Error submitting leave application:", error);
      console.error("Error submitting leave application:", error);
    }
  };

  return (
    <div className="leave-page-container">
      <div className="leave-page-header">
        <h1>Leave Application</h1>
      </div>
      <form className="leave-page-form" onSubmit={handleSubmit}>
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
          <input
            type="text"
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="apply-leave-button">
          Apply Leave
        </button>
      </form>
      <div className="leave-data-table">
        <h2>My Leave Data</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveData.map((leave, index) => (
              <tr key={index}>
                <td>{leave.date}</td>
                <td>{leave.reason}</td>
                <td>{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="back-button">Back</button>
    </div>
  );
}

export default LeavePage;
