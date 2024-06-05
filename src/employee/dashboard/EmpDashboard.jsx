import React from "react";
import "./EmpDashboard.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

function Empdashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://vtsemp-back.onrender.com/logout",
        { logId: localStorage.getItem("logId") }, // Include logId in the body
        {
          headers: { Authorization: Bearer ${token} },
        }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("logId"); // Remove logId from local storage
      navigate("/login");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  const getDashboardContent = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://vtsemp-back.onrender.com/dashboard",
        {
          headers: { Authorization: Bearer ${token} },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching dashboard content", error);
    }
  };

  React.useEffect(() => {
    getDashboardContent();
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="logo">
          <img src="./logo-icon.png" alt="Logo" />
        </div>
        <div className="user-info">
          <div className="dropdown">
            <button className="dropbtn">Menu</button>
            <div className="dropdown-content">
              <NavLink to="homepage">Homepage</NavLink>
              <NavLink to="task">Tasks</NavLink>
              <NavLink to="attendance">Attendance</NavLink>
              <NavLink to="announcements">Announcements</NavLink>
              <NavLink to="leave">Leave</NavLink>
              <NavLink to="profile">Profile</NavLink>
              <button onClick={handleLogout}>Logout</button>
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