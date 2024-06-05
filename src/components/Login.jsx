import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import "./Login.css";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://vtsemp-back.onrender.com/login",
        {
          username,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("logId", response.data.logId);
      setToken(response.data.token);
      navigate("/employee");
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
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
