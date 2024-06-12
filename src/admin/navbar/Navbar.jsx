import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Style file for Navbar
import logo from "C:/Users/DELL/Documents/GitHub/VTSEMP/public/logo-icon.png"
function Navbar() {
  const navigate = useNavigate()

  const handleAdminLogout = ()=>{
    localStorage.removeItem("admin")
    navigate("/admin/login")
  }
  return (
    <header className="dashboard-header">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h2>VTS</h2>
        </div>
        <div className="user-info">
          <span className="user-name">ADMIN</span>
          <div className="dropdown">
            <button className="dropbtn">Menu</button>
            <div className="dropdown-content">
              <NavLink to="/admin">Homepage</NavLink>

              <NavLink to="/admin/task">Tasks</NavLink>

              <NavLink to="/admin/attendance">Attendance</NavLink>

              <NavLink to="/admin/announcements">Announcements</NavLink>

              <NavLink to="/admin/leaves">Leave</NavLink>

              {/* <NavLink to="/admin/profile">profile</NavLink> */}
              <button onClick={handleAdminLogout}>Logout</button>
            </div>
          </div>
        </div>
      </header>
  );
}

export default Navbar;
