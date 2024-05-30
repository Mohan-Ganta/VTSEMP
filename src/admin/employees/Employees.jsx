import React, { useState } from "react";
import "./Employees.css";

const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const employees = [
    { name: "John Doe", vtsid: "VTS1234", designation: "Manager" },
    { name: "Jane Smith", vtsid: "VTS5678", designation: "Developer" },
    // Add more employees here
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShowModal = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>VTSID</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee, index) => (
            <tr
              key={index}
              className="table-row"
              onClick={() => handleShowModal(employee)}
            >
              <td>{employee.name}</td>
              <td>{employee.vtsid}</td>
              <td>{employee.designation}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Options for {selectedEmployee?.name}</h2>
              <button onClick={handleCloseModal} className="close-button">
                X
              </button>
            </div>
            <div className="modal-body">
              <button className="modal-button">Attendance</button>
              <button className="modal-button">Tasks</button>
              <button className="modal-button">Profile</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
