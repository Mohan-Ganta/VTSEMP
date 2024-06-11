import  { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
function Profile() {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log(empid);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userid = localStorage.getItem("userData");
        console.log("user data" +userid)
        const response = await axios.get(
          `https://vtsemp-back.onrender.com/employees/${localStorage.getItem("email")}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("response data from the feteched response" + response.data[0])
        setEmployee(response.data[0]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEmployeeData();
  },[employee]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profile-container">
      <div className="left-ra-babu">
        <img
          src={employee.profileUrl}
          alt="Profile"
          className="profile-picture"
        />
        <h1>{employee.fullname}</h1>
        <p>{employee.designation}</p>
      </div>
      <div className="profile-header">
        <div className="profile-details">
          <h2>Contact Information</h2>
          <p>
            <strong>Email:</strong> {employee.email}
          </p>
          <p>
            <strong>Phone:</strong> {employee.phoneNo}
          </p>
          <h2 className="heading-emp">Employee Details</h2>
          <p>
            <strong>ID:</strong> {employee.empId}
          </p>
          <a
            className="ofr-ltr-btn"
            href={employee.docUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Offer Letter
          </a>
        </div>
      </div>
    </div>
  );
}

export default Profile;
