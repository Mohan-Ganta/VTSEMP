import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Style file for Navbar

function Navbar() {
  return (
    <nav className="navbar" style={{ backgroundColor: "blue" }}>
      <div className="navbar-logo">
        <Link to="/">
          <img src="./logo-icon.png" alt="Logo" />
        </Link>
        <h2>VTS</h2>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/admin/login">Admin</Link>
        </li>
        <li>
          <Link to="/login">Sign In</Link>
        </li>
        <li>
          <Link to="/register">Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
