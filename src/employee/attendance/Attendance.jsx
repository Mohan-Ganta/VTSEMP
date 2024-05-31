import React, { useState } from "react";
import axios from "axios";
import "./Attendance.css";

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([
    {
      date: "2024-05-01",
      loginTime: "09:00 AM",
      logoutTime: "06:00 PM",
      duration: "9 hours"
    },
    {
      date: "2024-05-02",
      loginTime: "09:15 AM",
      logoutTime: "06:30 PM",
      duration: "9 hours 15 minutes"
    },
    {
      date: "2024-05-03",
      loginTime: "09:10 AM",
      logoutTime: "05:45 PM",
      duration: "8 hours 35 minutes"
    },
    {
      date: "2024-05-04",
      loginTime: "09:30 AM",
      logoutTime: "06:15 PM",
      duration: "8 hours 45 minutes"
    },
    {
      date: "2024-05-05",
      loginTime: "09:05 AM",
      logoutTime: "05:50 PM",
      duration: "8 hours 45 minutes"
    },
    {
      date: "2024-05-06",
      loginTime: "09:20 AM",
      logoutTime: "06:10 PM",
      duration: "8 hours 50 minutes"
    },
    {
      date: "2024-05-07",
      loginTime: "09:25 AM",
      logoutTime: "06:20 PM",
      duration: "8 hours 55 minutes"
    },
    {
      date: "2024-05-08",
      loginTime: "09:15 AM",
      logoutTime: "06:05 PM",
      duration: "8 hours 50 minutes"
    },
    {
      date: "2024-05-09",
      loginTime: "09:00 AM",
      logoutTime: "05:45 PM",
      duration: "8 hours 45 minutes"
    },
    {
      date: "2024-05-10",
      loginTime: "09:10 AM",
      logoutTime: "06:00 PM",
      duration: "8 hours 50 minutes"
    },
    {
      date: "2024-05-11",
      loginTime: "09:30 AM",
      logoutTime: "06:20 PM",
      duration: "8 hours 50 minutes"
    },
    {
      date: "2024-05-12",
      loginTime: "09:20 AM",
      logoutTime: "06:15 PM",
      duration: "8 hours 55 minutes"
    },
    {
      date: "2024-05-13",
      loginTime: "09:05 AM",
      logoutTime: "05:50 PM",
      duration: "8 hours 45 minutes"
    },
    {
      date: "2024-05-14",
      loginTime: "09:10 AM",
      logoutTime: "06:00 PM",
      duration: "8 hours 50 minutes"
    },
    {
      date: "2024-05-15",
      loginTime: "09:30 AM",
      logoutTime: "06:20 PM",
      duration: "8 hours 50 minutes"
    },
    {
      date: "2024-05-16",
      loginTime: "09:20 AM",
      logoutTime: "06:15 PM",
      duration: "8 hours 55 minutes"
    },
    {
      date: "2024-05-17",
      loginTime: "09:05 AM",
      logoutTime: "05:50 PM",
      duration: "8 hours 45 minutes"
    },
    {
      date: "2024-05-18",
      loginTime: "09:10 AM",
      logoutTime: "06:00 PM",
      duration: "8 hours 50 minutes"
    },
    {
      date: "2024-05-19",
      loginTime: "09:30 AM",
      logoutTime: "06:20 PM",
      duration: "8 hours 50 minutes"
    },
    {
      date: "2024-05-20",
      loginTime: "09:20 AM",
      logoutTime: "", // No logout time recorded
      duration: "" // No duration available
    }
  ]);
  
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
    const filteredData = attendanceData.filter((entry) => {
      const fromDate = new Date(dateRange.from);
      const toDate = new Date(dateRange.to);
      const currentDate = new Date(entry.date);
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
