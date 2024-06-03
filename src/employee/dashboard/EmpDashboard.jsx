import React from "react";
import "./EmpDashboard.css";
import { NavLink, Outlet } from "react-router-dom";

function Empdashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getDashboardContent = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://vtsemp-back.onrender.com/dashboard', {
        headers: { 'Authorization': token }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching dashboard content');
    }
  };

  React.useEffect(() => {
    getDashboardContent();
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="logo">
          <img src="./logo-icon.png" alt="Logo" />
        </div>
        <div className="user-info">

          <div className="dropdown">
            <button className="dropbtn">Menu</button>
            <div className="dropdown-content">
              <a href="#">
                <NavLink to="homepage">Homepage</NavLink>
              </a>
              <a href="#">
                <NavLink to="task">Tasks</NavLink>
              </a>

              <a href="#">
                <NavLink to="attendance">Attendance</NavLink>
              </a>

              <a href="#">
                <NavLink to="announcements">Announcements</NavLink>
              </a>
              <a href="#">
                <NavLink to="leave">Leave</NavLink>
              </a>
              <a href="#">
                <NavLink to="profile">profile</NavLink>
              </a>

              <a href="#" onClick={handleLogout}>
                Logout
              </a>
            </div>
          </div>
        </div>
      </header>
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
