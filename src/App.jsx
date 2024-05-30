<<<<<<< HEAD
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
=======
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

// employee
import Attendance from "./employee/attendance/Attendance";
import Homepage from "./employee/homepage/Homepagee";
import Leaves from "./employee/leaves/Leaves";
import Task from "./employee/task/Task";
>>>>>>> 3bfe4345bdb08fc807d36e344a04b9ddafd15dce

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
<<<<<<< HEAD
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
=======
        <Route path="/att" element={<Attendance />} />

        <Route
          path="employee"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        >
          <Route index element={<Navigate replace to="homepage" />} />
          <Route path="homepage" element={<Homepage />} />
          <Route path="leaves" element={<Attendance />} />
          <Route path="task" element={<Task />} />
          <Route path="leave" element={<Leaves />} />
        </Route>
>>>>>>> 3bfe4345bdb08fc807d36e344a04b9ddafd15dce
      </Routes>
    </Router>
  );
}

export default App;
