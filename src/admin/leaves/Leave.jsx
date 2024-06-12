import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Leave.css";
import Navbar from "../navbar/Navbar";

function LeavePage() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("Pending");

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get(
        "https://vtsemp-back.onrender.com/leave"
      );
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
    } else if (sortBy === "status") {
      return [...requests].sort((a, b) => {
        const statusA = a.status.toUpperCase();
        const statusB = b.status.toUpperCase();
        if (statusA < statusB) {
          return -1;
        }
        if (statusA > statusB) {
          return 1;
        }
        return 0;
      });
    } else {
      return requests;
    }
  };

  const handleStatusChange = async (e, index) => {
    const { value } = e.target;
    const updatedLeaveRequests = [...leaveRequests];
    updatedLeaveRequests[index].status = value;
    setLeaveRequests(updatedLeaveRequests);

    try {
      await axios.put(
        `https://vtsemp-back.onrender.com/leave/${updatedLeaveRequests[index]._id}`,
        {
          status: value,
        }
      );
    } catch (error) {
      console.error("Error updating leave status:", error);
      setLeaveRequests((prevRequests) => {
        const rollbackRequests = [...prevRequests];
        rollbackRequests[index].status = leaveRequests[index].status;
        return rollbackRequests;
      });
    }
  };

  return (
   <>
   <Navbar />
    <div className="leave-page-container">
      <div className="leave-page-header">
        <h1>Leave Requests</h1>
        <div className="leave-page-sort">
          {/* <label>Sort by:</label>
          <select onChange={handleSortChange}>
            <option value="">None</option>
            <option value="date">Date</option>
            <option value="status">Status</option>
          </select> */}
          <label>Filter by Status:</label>
          <select value={filterBy} onChange={handleFilterChange}>
            <option value="Pending">Pending</option>
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
                <td>
                  <select
                    value={request.status}
                    onChange={(e) => handleStatusChange(e, index)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Declined">Declined</option>
                  </select>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
   </>
  );
}

export default LeavePage;
