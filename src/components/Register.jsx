import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    id: "",
    email: "",
    mobile: "",
    dob: "",
    doj: "",
    designation: "",
    profilePhoto: null,
    offerLetter: null,
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "https://vtsemp-back.onrender.com/register",
        data
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );
      console.log(response.data);
      alert("User registered successfully");
    } catch (error) {
      console.error("There was an error registering the user!", error);
      alert("Failed to register user");
    }
  };

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  // const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post("https://vtsemp-back.onrender.com/register", {
  //       username,
  //       password,
  //     });
  //     navigate("/login");
  //   } catch (err) {
  //     if (err.response && err.response.status === 400) {
  //       setError("Error registering user. Please try again.");
  //     } else {
  //       setError("An error occurred. Please try again later.");
  //     }
  //     console.error(err.message);
  //   }
  // };

  return (
    <div className="registration-container">
      <div className="registration-box">
        <h1>Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="id">ID</label>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="mobile">Mobile Number</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="doj">Date of Joining</label>
              <input
                type="date"
                id="doj"
                name="doj"
                value={formData.doj}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="designation">Designation</label>
              <input
                type="designation"
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              />
              {/* <select
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
            >
              <option value="">Choose Designation</option>
              <option value="Manager">Manager</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Analyst">Analyst</option>
            </select> */}
            </div>
            <div className="input-group">
              <label htmlFor="profilePhoto">Profile Photo</label>
              <input
                type="file"
                id="profilePhoto"
                name="profilePhoto"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="offerLetter">Offer Letter (PDF)</label>
              <input
                type="file"
                id="offerLetter"
                name="offerLetter"
                accept="application/pdf"
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="registration-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
