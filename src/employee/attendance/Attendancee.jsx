import React, { useState } from "react";
import "./Attendancee.css";

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [sortOptions, setSortOptions] = useState({
    empId: "",
    month: "",
    year: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDateRange({ ...dateRange, [name]: value });
    setSortOptions({ ...sortOptions, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Date Range:", dateRange);
    console.log("Sort Options:", sortOptions);
    // Fetch and set the attendance data based on the date range and sort options
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
            <div className="input-group">
              <label htmlFor="empId">Employee ID</label>
              <input
                type="text"
                id="empId"
                name="empId"
                value={sortOptions.empId}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="month">Month</label>
              <input
                type="month"
                id="month"
                name="month"
                value={sortOptions.month}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="year">Year</label>
              <input
                type="number"
                id="year"
                name="year"
                value={sortOptions.year}
                onChange={handleInputChange}
                placeholder="YYYY"
                min="2000"
                max={new Date().getFullYear()}
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
                <td>{entry.workingHours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;
