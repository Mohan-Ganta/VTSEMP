import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./employee/login/Login";
import Attendance from "./employee/attendance/Attendancee";
import Attendancea from "./admin/attendance/Attendance";
import Registration from "./employee/registration/Registrationn";
import EmpDashboard from "./employee/dashboard/EmpDashboard";
import LeavePage from "./employee/leaves/Leaves";
import Homepage from "./employee/homepage/Homepagee";
import Task from "./employee/task/Task";
import EmployeeList from "./admin/employees/Employees";
import Homepagee from "./employee/homepage/Homepagee";
import AdminHomepage from "./admin/homepage/Homepagee";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="login" />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Registration />} />

          <Route path="employee" element={<EmpDashboard />}>
            <Route index element={<Navigate replace to="homepage" />} />
            <Route path="homepage" element={<Homepagee />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="leaves" element={<LeavePage />} />
            <Route path="homepage" element={<Homepage />} />
            <Route path="task" element={<Task />} />
          </Route>

          <Route path="admin" element={<EmpDashboard />}>
            <Route index element={<Navigate replace to="homepage" />} />
            <Route path="homepage" element={<AdminHomepage />} />
            <Route path="employeeslist" element={<EmployeeList />} />
            <Route path="attendance" element={<Attendancea />} />
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
