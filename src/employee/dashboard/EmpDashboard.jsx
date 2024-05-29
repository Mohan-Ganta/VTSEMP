import React from "react";
import "./EmpDashboard.css";
import { Outlet } from "react-router-dom";

function Empdashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="logo">Logo</div>
        <div className="user-info">
          <span className="user-name">John Doe</span>
          <span className="user-id">ID: 12345</span>
          <div className="dropdown">
            <button className="dropbtn">Menu</button>
            <div className="dropdown-content">
              <a href="#settings">Attendance</a>
              <a href="#logout">Events</a>
              <a href="#logout">Tasks</a>
              <a href="#logout">Announcements</a>
              <a href="#profile">Profile</a>
            </div>
          </div>
        </div>
      </header>
      <main className="dashboard-main">
        <Outlet />
      </main>
      <footer className="dashboard-footer">
        <p>&copy; VTS</p>
      </footer>
    </div>
  );
}

export default Empdashboard;
