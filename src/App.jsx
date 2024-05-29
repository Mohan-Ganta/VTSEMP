import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./employee/login/Login";
import Attendance from "./employee/attendance/Attendancee";
import Registration from "./employee/registration/Registrationn";
import EmpDashboard from "./employee/dashboard/EmpDashboard";
import LeavePage from "./employee/leaves/Leaves";
import Homepage from "./employee/homepage/Homepagee";
import Task from "./employee/task/Task";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="login" />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Registration />} />

          <Route path="dashboard" element={<EmpDashboard />}>
            <Route path="attendance" element={<Attendance />} />
            <Route path="leaves" element={<LeavePage />} />
            <Route path="homepage" element={<Homepage />} />
            <Route path="task" element={<Task />} />
          </Route>

          <Route path="*" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// echo "# EMPVTS" >> README.md
// git init
// git add .
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/Mohan-Ganta/EMPVTS.git
// git push -u origin main

// git config --global user.email CharanKondaveeti
// git config --global user.name Mjgangstar*1
