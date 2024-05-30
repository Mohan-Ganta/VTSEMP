import React, { useState } from "react";
import "./Attendance.css";

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([
    {
      date: "2023-05-01",
      empId: "101",
      loginTime: "09:00",
      logoutTime: "17:00",
      workingHours: 8,
    },
    {
      date: "2023-05-02",
      empId: "102",
      loginTime: "09:15",
      logoutTime: "17:15",
      workingHours: 8,
    },
    {
      date: "2023-05-01",
      empId: "103",
      loginTime: "08:45",
      logoutTime: "16:45",
      workingHours: 8,
    },
    // Add more mock data as needed
  ]);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [sortOptions, setSortOptions] = useState({
    empId: "",
    month: "",
    year: "",
  });
  const [sortBy, setSortBy] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDateRange({ ...dateRange, [name]: value });
    setSortOptions({ ...sortOptions, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Date Range:", dateRange);
    console.log("Sort Options:", sortOptions);
    sortData();
  };

  const sortData = () => {
    let sortedData = [...attendanceData];

    if (sortBy === "empId" && sortOptions.empId) {
      sortedData = sortedData.filter(
        (entry) => entry.empId === sortOptions.empId
      );
    }

    if (sortBy === "date" && dateRange.from && dateRange.to) {
      sortedData = sortedData.filter(
        (entry) => entry.date >= dateRange.from && entry.date <= dateRange.to
      );
    }

    setAttendanceData(sortedData);
  };

  const renderSortOptions = () => {
    if (sortBy === "empId") {
      return (
        <div className="form-row">
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
        </div>
      );
    } else if (sortBy === "date") {
      return (
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
        </div>
      );
    }
    return null;
  };

  return (
    <div className="attendance-container">
      <div className="attendance-box">
        <h1>Attendance</h1>
        <div className="sort-buttons">
          <button
            type="button"
            className={`sort-button ${sortBy === "empId" ? "active" : ""}`}
            onClick={() => setSortBy("empId")}
          >
            Sort by Employee ID
          </button>
          <button
            type="button"
            className={`sort-button ${sortBy === "date" ? "active" : ""}`}
            onClick={() => setSortBy("date")}
          >
            Sort by Date
          </button>
        </div>
        {sortBy && (
          <form onSubmit={handleSubmit} className="sort-form">
            {renderSortOptions()}
            <button type="submit" className="sort-button">
              Sort Out
            </button>
          </form>
        )}
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Employee ID</th>
              <th>Login Time</th>
              <th>Logout Time</th>
              <th>Working Hours</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.empId}</td>
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
