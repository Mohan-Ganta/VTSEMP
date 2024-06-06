// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "./navbar/Navbar";
// import "./Register.css";

// function Register() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("https://vtsemp-back.onrender.com/register", {
//         username,
//         password,
//       });
//       navigate("/login");
//     } catch (err) {
//       if (err.response && err.response.status === 400) {
//         setError("Error registering user. Please try again.");
//       } else {
//         setError("An error occurred. Please try again later.");
//       }
//       console.error(err.message);
//     }
//   };

//   return (
//     <div className="register-container">
//       <Navbar />
//       <div className="form-ctn">
//         <form className="register-form" onSubmit={handleSubmit}>
//           <h2>Register</h2>
//           <div>
//             <label>Username</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           {error && <div className="error-message">{error}</div>}
//           <button className="submit-btn" type="submit">
//             Register
//           </button>
//           <br></br>

//           <Link to="/login">Already have account? Signin</Link>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Register;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [profile, setProfile] = useState(null);
  const [offerLetter, setOfferLetter] = useState(null);
  const [empId, setEmpId] = useState("");
  const [designation, setDesignation] = useState(""); // New designation state
  const [profileUrl, setProfileUrl] = useState("");
  const [docUrl, setDocUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const data = {
      fullname: fullName,
      phoneNo: phoneNo,
      email: email,
      empId: empId,
      designation: designation, // Include designation in data
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
      <div className="register-form">
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
                onChange={(e) => setDesignation(e.target.value)} // New input for designation
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
        <div className="row">
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
      </div>
      <button className="register-btn btn" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default Register;
