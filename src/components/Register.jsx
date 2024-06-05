import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://vtsemp-back.onrender.com/register", {
        username,
        password,
      });
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("Error registering user. Please try again.");
      } else {
        setError("An error occurred. Please try again later.");
      }
      console.error(err.message);
    }
  };

  return (
    <div className="register-container">
      <Navbar />
      <div className="form-ctn">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Register</h2>
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
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
