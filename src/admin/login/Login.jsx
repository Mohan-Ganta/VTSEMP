import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Advanced CSS file

function Login() {
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [error,setError] = useState()
  const navigate = useNavigate()
  const handleChangeEmail = (e)=>{
    setEmail(e.target.value)
  }
  const handleChangePassword = (e)=>{
    setPassword(e.target.value)
  }
  const handleSubmit = async (e) => {
    console.log("era");
    e.preventDefault();
    if(email === "admin@gmail.com" && password === "vts@admin")
      {
        console.log("Welcome Admin")
        localStorage.setItem("admin","true")
        navigate("/admin")
      }
      else{
        setError("Invalid Credentials")
      }

    // try {
    //   console.log("Submitting credentials:", credentials);

    //   const response = await axios.post(`${process.env.API_URL}/login`, {
    //     email: credentials.email,
    //     password: credentials.password,
    //   });
    //   console.log("Response data:", response.data);

    //   // Store the token in local storage
    //   // localStorage.setItem("token", response.data.token);

    //   localStorage.setItem("token", response.data.token);
    //   console.log(response.data);

    //   navigate("/dashboard/homepage");
    // } catch (error) {
    //   console.error("There was an error logging in!", error);
    //   setError("Login failed. Please check your email and password.");
    // }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChangeEmail}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChangePassword}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p>Back to <a href="/">User Login</a></p>
      </div>
    </div>
  );
}
export default Login;
