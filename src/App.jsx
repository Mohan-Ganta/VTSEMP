import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./employee/login/Login";
// employee
import Attendance from "./admin/attendance/Attendancee";
import Registration from "./employee/registration/Registrationn";
import EmpDashboard from "./employee/dashboard/EmpDashboard";
import LeavePage from "./employee/leaves/Leaves";
import Homepage from "./employee/homepage/Homepagee";
import Task from "./employee/task/Task";
// import Reg from "./employee/registration/Signup";

// admin
import AdAttendance from "./employee/attendance/Attendance";
import AdEmpDashboard from "./admin/dashboard/EmpDashboard";
import AdHomepage from "./admin/homepage/Homepagee";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="login" />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Registration />} />
          {/* <Route exact path="/Reg" element={<Reg />} /> */}

          <Route path="employee" element={<EmpDashboard />}>
            <Route path="attendance" element={<AdAttendance />} />
            <Route path="leaves" element={<LeavePage />} />
            <Route path="homepage" element={<Homepage />} />
            <Route path="task" element={<Task />} />
          </Route>

          <Route path="admin" element={<AdEmpDashboard />}>
            <Route path="homepage" element={<AdHomepage />} />
            <Route path="attendance" element={<Attendance />} />
          </Route>

          <Route path="*" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
