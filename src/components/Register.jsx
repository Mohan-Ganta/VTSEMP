import "./Register.css";
import Navbar from "./navbar/Navbar";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [profile, setProfile] = useState(null);
  const [offerLetter, setOfferLetter] = useState(null);
  const [empId, setEmpId] = useState("");
  const [designation, setDesignation] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [docUrl, setDocUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const data = {
      fullname: fullName,
      phoneNo: phoneNo,
      email: email,
      empId: empId,
      designation: designation,
      profileUrl: profileUrl,
      docUrl: docUrl,
      password: password,
    };

    if (profileUrl !== "" && docUrl !== "") {
      console.log(data);
      const url = "https://vtsemp-back.onrender.com/add";
      axios
        .post(url, data)
        .then((res) => {
          alert(res.data);
          navigate("/login");
        })
        .catch((err) => alert("Failed adding data"));
    }
  }, [profileUrl, docUrl]);

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append("image", profile);
    formData.append("description", "Image");
    axios.defaults.baseURL = "https://vtsemp-back.onrender.com/upload/images";
    await axios
      .post("/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setProfileUrl(res.data.image_url);
      })
      .catch((err) => {
        console.log(err);
      });

    const docFormData = new FormData();
    docFormData.append("file", offerLetter);
    docFormData.append("description", "file");

    axios.defaults.baseURL = "https://vtsemp-back.onrender.com/";

    const uploadPDF = async () => {
      try {
        const response = await axios.post("/upload/doc", docFormData, {
          headers: { "Content-Type": "application/pdf" },
        });
        console.log("Hello " + response.data.docurl);
        setDocUrl(response.data.docurl);
      } catch (error) {
        console.error(error);
      }
    };
    await uploadPDF();
  };

  return (
    <div>
      <Navbar />

      <div className="register-form">
        <h1>Register</h1>
        <div className="row">
          <div className="elem">
            <div className="label">Full Name</div>
            <div className="field">
              <input
                type="text"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>
          <div className="elem">
            <div className="label">Phone No:</div>
            <div className="field">
              <input type="text" onChange={(e) => setPhoneNo(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="elem">
            <div className="label">Email</div>
            <div className="field">
              <input type="text" onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="elem">
            <div className="label">EMP Id:</div>
            <div className="field">
              <input type="text" onChange={(e) => setEmpId(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="elem">
            <div className="label">Designation</div>
            <div className="field">
              <input
                type="text"
                onChange={(e) => setDesignation(e.target.value)}
              />
            </div>
          </div>
          <div className="elem">
            <div className="label">Password</div>
            <div className="field">
              <input
                type="text"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="elem">
            <div className="label">Profile Pic</div>
            <div className="field">
              <input
                type="file"
                onChange={(e) => setProfile(e.target.files[0])}
              />
            </div>
          </div>
          <div className="elem">
            <div className="label">Offer Letter</div>
            <div className="field">
              <input
                type="file"
                onChange={(e) => setOfferLetter(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        <button className="register-btn btn" onClick={handleRegister}>
          Register
        </button>

        <Link to="/login">Already have account? Signin</Link>
      </div>
    </div>
  );
};

export default Register;
