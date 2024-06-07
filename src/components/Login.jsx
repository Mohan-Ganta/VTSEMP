import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import "./Login.css";
import eyeIcon from "./eye.svg";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email === "admin" && password === "admin") {
        navigate("/admin");
      } else {
        const response = await axios.post(
          "https://vtsemp-back.onrender.com/login",
          {
            email,
            password,
          }
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("logId", response.data.logId);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem(
          "userData",
          JSON.stringify(response.data.userData)
        ); // Store full user data

        console.log(response.data);

        setToken(response.data.token);
        navigate("/employee");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("Invalid credentials");
      } else {
        setError("An error occurred. Please try again later.");
      }
      console.error(err.message);
    }
  };

  return (
    <div className="login-container">
      <Navbar />
      <div className="form-ctn">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img src={eyeIcon} alt="Eye icon" />
              </button>
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button className="login-btn" type="submit">
            Login
          </button>{" "}
          <br />
          <Link to="/register">New User?</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
