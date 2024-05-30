import React, { useState } from "react";
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

// admin
import AttendanceAd from "./admin/attendance/Attendancee";
import HomepageAd from "./admin/homepage/Homepagee";
import TaskAd from "./admin/task/Task";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <Routes>
        <Route index element={<Navigate replace to="login" />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="employee"
          element={token ? <EmpDashboard /> : <Navigate to="/login" />}
        >
          <Route index element={<Navigate replace to="homepage" />} />
          <Route path="homepage" element={<Homepage />} />
          <Route path="leaves" element={<Attendance />} />
          <Route path="task" element={<Task />} />
          <Route path="leave" element={<Leaves />} />
        </Route>

        <Route
          path="admin"
          element={token ? <EmpDashboard /> : <Navigate to="/login" />}
        >
          <Route index element={<Navigate replace to="homepage" />} />
          <Route path="attendance" element={<AttendanceAd />} />
          <Route path="homepage" element={<HomepageAd />} />
          <Route path="task" element={<TaskAd />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
