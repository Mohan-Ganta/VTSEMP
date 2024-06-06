import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EmpDashboard.css";

function EmpDashboard() {
  const navigate = useNavigate();
  const [empId, setEmpId] = useState(localStorage.getItem("empId"));
  const [employee, setEmployee] = useState("");

  // Fetch whole employee data
  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      const response = await axios.get(
        `https://vtsemp-back.onrender.com/employees/${email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEmployee(response.data[0]);
    } catch (error) {
      console.error("Error fetching employee data", error);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://vtsemp-back.onrender.com/logout",
        { logId: localStorage.getItem("logId") },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("logId");
      localStorage.removeItem("empId");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);
  // let empid = employee.empId;
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="logo">
          <img src="./logo-icon.png" alt="Logo" />
          <h2>VTS</h2>
          <p>vts id : {employee.empId}</p> {/* Render empId here */}
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

              <NavLink empid={employee.empId} to="profile">
                Profile
              </NavLink>

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

export default EmpDashboard;
