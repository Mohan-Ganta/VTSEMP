import React, { useState, useEffect } from "react";
import axios from "axios";
import { AppProvider } from "./components/AppContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
// import Register from "./employee/registration/Registrationn";

// employee
import EmpDashboard from "./employee/dashboard/EmpDashboard";
import Attendance from "./employee/attendance/Attendance";
import Homepage from "./employee/homepage/Homepagee";
import Leaves from "./employee/leaves/Leaves";
import Task from "./employee/task/Task";
import Announcements from "./employee/announcements/Announcements";
import Profile from "./employee/profile/Profile";

// admin
import AttendanceAd from "./admin/attendance/Attendancee";
import HomepageAd from "./admin/homepage/Homepagee";
import TaskAd from "./admin/task/Task";
import AnnouncementsAd from "./admin/announcements/Announcements";
import LeaveAd from "./admin/leaves/Leave";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [employee, setEmployee] = useState("");

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    if (username) localStorage.setItem("username", username);
  }, [token, username]);

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
  useEffect(() => {
    fetchEmployees();
  }, []);
  return (
    <Router>
      <AppProvider>
      <Routes>
        <Route index element={<Navigate replace to="login" />} />
        <Route
          path="/login"
          element={<Login setToken={setToken} setUsername={setUsername} />}
        />
        <Route path="/register" element={<Register />} />

        <Route
          path="employee"
          element={token ? <EmpDashboard /> : <Navigate to="/login" />}
        >
          <Route index element={<Navigate replace to="homepage" />} />
          <Route
            path="homepage"
            element={<Homepage username={username} empid={employee?.empId} />}
          />
          <Route
            path="attendance"
            element={<Attendance empid={employee?.empId} />}
          />
          <Route path="task" element={<Task empid={employee?.empId} />} />
          <Route path="leave" element={<Leaves empid={employee?.empId} />} />
          <Route path="profile" element={<Profile empid={employee?.empId} />} />
          <Route
            path="announcements"
            element={<Announcements empid={employee?.empId} />}
          />
        </Route>

        <Route
          path="admin"
          element={token ? <EmpDashboard /> : <Navigate to="/login" />}
        >
          <Route index element={<Navigate replace to="homepage" />} />
          <Route path="homepage" element={<HomepageAd username={username} />} />
          <Route path="attendance" element={<AttendanceAd />} />
          <Route path="announcements" element={<AnnouncementsAd />} />
          <Route path="leave" element={<LeaveAd />} />
          <Route path="task" element={<TaskAd />} />
        </Route>
      </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
