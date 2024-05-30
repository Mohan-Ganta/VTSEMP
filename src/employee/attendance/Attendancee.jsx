import React, { useState } from "react";
import axios from "axios";
// import "./Attendance.css";

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDateRange({ ...dateRange, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAttendanceData();
  };

  const fetchAttendanceData = () => {
    axios
      .get(`http://localhost:5000/attendance/${dateRange.from}/${dateRange.to}`)
      .then((response) => {
        setAttendanceData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
      });
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
                <td>{entry.date}</td>
                <td>{entry.loginTime}</td>
                <td>{entry.logoutTime}</td>
                <td>{entry.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;
