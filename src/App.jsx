import React, { useState, useEffect } from "react";
import axios from "axios";
import { AppProvider } from "./components/AppContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
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
import AdminLogin from "./admin/login/Login"
import AdminDashBoard from "./admin/dashboard/EmpDashboard"
import AttendanceAd from "./admin/attendance/Attendancee";
import HomepageAd from "./admin/homepage/Homepagee";
import TaskAd from "./admin/task/Task";
import AnnouncementsAd from "./admin/announcements/Announcements";
import LeaveAd from "./admin/leaves/Leave";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [employee, setEmployee] = useState("");
  const [isAdmin,setIsAdmin] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem("admin"))
      setIsAdmin(true)
    else
      setIsAdmin(false)
  },[isAdmin])
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
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* <Route path="/admin" element={isAdmin ? (<AdminDashBoard />):(<><h3>Access Denied !!!!!</h3><br/>Please login with Admin credentials to view this page</>)} /> */}
        <Route path="/admin" element={isAdmin?(<HomepageAd />):(<><h3>Access Denied !!!!!</h3><br/>Please login with Admin credentials to view this page</>)} />
        <Route path="/admin/task" element={isAdmin?(<TaskAd />):(<><h3>Access Denied !!!!!</h3><br/>Please login with Admin credentials to view this page</>)} />
        <Route path="/admin/attendance" element={isAdmin?(<AttendanceAd />):(<><h3>Access Denied !!!!!</h3><br/>Please login with Admin credentials to view this page</>)} />
        <Route path="/admin/announcements" element={isAdmin?(<AnnouncementsAd />):(<><h3>Access Denied !!!!!</h3><br/>Please login with Admin credentials to view this page</>)} />
        <Route path="/admin/leaves" element={isAdmin?(<LeaveAd />):(<><h3>Access Denied !!!!!</h3><br/>Please login with Admin credentials to view this page</>)} />




        {/* <Route
          path="admin"
          element={token ? <EmpDashboard /> : <Navigate to="/login" />}
        >
          <Route index element={<Navigate replace to="homepage" />} />
          <Route path="homepage" element={<HomepageAd username={username} />} />
          <Route path="attendance" element={<AttendanceAd />} />
          <Route path="announcements" element={<AnnouncementsAd />} />
          <Route path="leave" element={<LeaveAd />} />
          <Route path="task" element={<TaskAd />} />
        </Route> */}
      </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
