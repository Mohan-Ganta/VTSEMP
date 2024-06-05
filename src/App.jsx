import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

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

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    if (username) localStorage.setItem("username", username);
  }, [token, username]);

  return (
    <Router>
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
          <Route path="homepage" element={<Homepage username={username} />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="task" element={<Task />} />
          <Route path="leave" element={<Leaves />} />
          <Route path="profile" element={<Profile />} />
          <Route path="announcements" element={<Announcements />} />
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
    </Router>
  );
}

export default App;
