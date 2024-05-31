import React from "react";
import "./Profile.css"; // Don't forget to create the corresponding CSS file for styling

function Profile() {
  // Sample employee data
  const employee = {
    id: "VTS2025107",
    name: "Mohan Ganta",
    position: "Software Engineer",
    department: "Engineering",
    email: "mohan.ganta@example.com",
    phoneNumber: "+91 9618850656",
    address: "Seetharampuram, 1-80, Roypeta, Narasapuram",
    profilePicture: "https://mohan-ganta.github.io/portofolio/static/media/boy.13213880b149bb2f272f.png", // Placeholder image URL
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={employee.profilePicture}
          alt="Profile"
          className="profile-picture"
        />
        <h1>{employee.name}</h1>
        <p>{employee.position}</p>
      </div>
      <div className="profile-details">
        <h2>Contact Information</h2>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Phone:</strong> {employee.phoneNumber}</p>
        <p><strong>Address:</strong> {employee.address}</p>
        <h2>Employee Details</h2>
        <p><strong>ID:</strong> {employee.id}</p>
        <p><strong>Department:</strong> {employee.department}</p>
      </div>
    </div>
  );
}

export default Profile;
