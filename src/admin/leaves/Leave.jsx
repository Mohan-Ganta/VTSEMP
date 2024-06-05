import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Leave.css";

function LeavePage() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");

  useEffect(() => {
    // Fetch leave requests from the server on component mount
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get("/api/leave");
      setLeaveRequests(response.data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterBy(e.target.value);
  };

  const filterLeaveRequests = (requests) => {
    if (filterBy === "Approved") {
      return requests.filter((request) => request.status === "Approved");
    } else if (filterBy === "Declined") {
      return requests.filter((request) => request.status === "Declined");
    } else {
      return requests;
    }
  };

  const sortLeaveRequests = (requests) => {
    if (sortBy === "date") {
      return [...requests].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      return requests;
    }
  };

  return (
    <div className="leave-page-container">
      <div className="leave-page-header">
        <h1>Leave Requests</h1>
        <div className="leave-page-sort">
          <label>Sort by:</label>
          <select onChange={handleSortChange}>
            <option value="">None</option>
            <option value="date">Date</option>
          </select>
          <label>Filter by Status:</label>
          <select onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Approved">Approved</option>
            <option value="Declined">Declined</option>
          </select>
        </div>
      </div>
      <table className="leave-requests-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>ID</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sortLeaveRequests(filterLeaveRequests(leaveRequests)).map(
            (request, index) => (
              <tr key={index}>
                <td>{request.date}</td>
                <td>{request.name}</td>
                <td>{request.id}</td>
                <td>{request.reason}</td>
                <td>{request.status}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LeavePage;
