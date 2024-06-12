import Navbar from "../navbar/Navbar";
import "./EmpDashboard.css";
import { Outlet } from "react-router-dom";

function Empdashboard() {
  
  return (
    <div className="dashboard">
      <Navbar />
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
