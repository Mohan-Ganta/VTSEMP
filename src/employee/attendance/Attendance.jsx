import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Attendance.css";

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get("https://vtsemp-back.onrender.com/attendance");
      setAttendanceData(response.data);
    } catch (error) {
      console.error("Error fetching attendance data", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDateRange({ ...dateRange, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredData = attendanceData.filter((entry) => {
      const fromDate = new Date(dateRange.from);
      const toDate = new Date(dateRange.to);
      const currentDate = new Date(entry.loginTime);
      return currentDate >= fromDate && currentDate <= toDate;
    });
    setAttendanceData(filteredData);
  };

  return (
    <div className="attendance-container">
      <div className="attendance-box">
        <h1>Attendance</h1>
        <form onSubmit={handleSubmit} className="sort-form">
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="from">From Date</label>
              <input
                type="date"
                id="from"
                name="from"
                value={dateRange.from}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="to">To Date</label>
              <input
                type="date"
                id="to"
                name="to"
                value={dateRange.to}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="sort-button">
              Sort Out
            </button>
          </div>
        </form>
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Login Time</th>
              <th>Logout Time</th>
              <th>Working Hours</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((entry, index) => (
              <tr key={index}>
                <td>{new Date(entry.loginTime).toLocaleDateString()}</td>
                <td>{new Date(entry.loginTime).toLocaleTimeString()}</td>
                <td>{entry.logoutTime ? new Date(entry.logoutTime).toLocaleTimeString() : "-"}</td>
                <td>{entry.workingTime ? `${Math.floor(entry.workingTime / 3600000)} hours ${Math.floor((entry.workingTime % 3600000) / 60000)} minutes` : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;
