import React from "react";
import "./EmpDashboard.css";
import { Outlet } from "react-router-dom";

function Empdashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="logo">
          <img src="./logo-icon.png" alt="Logo" />
          <h2>VTS</h2>
        </div>
        <div className="user-info">
          <span className="user-name">John Doe</span>
          <span className="user-id">ID: 12345</span>
          <div className="dropdown">
            <button className="dropbtn">Menu</button>
            <div className="dropdown-content">
              <a href="#">
                <NavLink to="homepage">Homepage</NavLink>
              </a>
              <a href="#">
                <NavLink to="task">Tasks</NavLink>
              </a>

              <a href="#">
                <NavLink to="attendance">Attendance</NavLink>
              </a>

              <a href="#">
                <NavLink to="announcements">Announcements</NavLink>
              </a>
              <a href="#">
                <NavLink to="leave">Leave</NavLink>
              </a>
              <a href="#">
                <NavLink to="profile">profile</NavLink>
              </a>
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
