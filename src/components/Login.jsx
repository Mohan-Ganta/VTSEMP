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
        const response = await axios.post("https://vtsemp-back.onrender.com/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      navigate("/employee");
    } catch (error) {
      setError("Invalid credentials");
      console.error(error.message);
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
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
