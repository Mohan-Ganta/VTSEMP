import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Announcements.css";

const Announcement = () => {
  const [announcement, setAnnouncement] = useState("");
  const [announcements, setAnnouncements] = useState([]);

  // Fetch all announcements on component mount
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          "https://vtsemp-back.onrender.com/announcements"
        );
        setAnnouncements(response.data.announcements);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleAnnouncementChange = (e) => {
    setAnnouncement(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (announcement.trim()) {
      try {
        const response = await axios.post(
          "https://vtsemp-back.onrender.com/announcements",
          {
            message: announcement,
            dateTime: new Date().toLocaleString(),
          }
        );
        setAnnouncements([...announcements, response.data.announcement]);
        setAnnouncement("");
      } catch (error) {
        console.error("Error creating announcement:", error);
      }
    }
  };

  const handleEdit = async (id) => {
    const updatedMessage = prompt("Enter updated announcement");
    const updatedDateTime = new Date().toLocaleString(); // Automatically get current date and time
    if (updatedMessage) {
      try {
        const response = await axios.put(
          `https://vtsemp-back.onrender.com/announcements/${id}`,
          {
            message: updatedMessage,
            dateTime: updatedDateTime,
          }
        );
        const updatedAnnouncements = announcements.map((ann) =>
          ann._id === id ? response.data.announcement : ann
        );
        setAnnouncements(updatedAnnouncements);
      } catch (error) {
        console.error("Error updating announcement:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://vtsemp-back.onrender.com/announcements/announcements/${id}`
      );
      const updatedAnnouncements = announcements.filter(
        (ann) => ann._id !== id
      );
      setAnnouncements(updatedAnnouncements);
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  return (
    <div className="anc-ctn">
      <div className="announcement-container">
        <div className="announcement-box">
          <h2 className="announcement-heading">Announcement Box</h2>
          <form onSubmit={handleSubmit} className="announcement-form">
            <input
              type="text"
              value={announcement}
              onChange={handleAnnouncementChange}
              placeholder="Enter announcement"
              className="announcement-input"
            />
            <button type="submit" className="announcement-button">
              Announce
            </button>
          </form>
          {announcements.length > 0 && (
            <div className="announcement-list">
              {announcements.map((ann) => (
                <div key={ann._id} className="announcement-card">
                  <div className="announcement-content">
                    <p>{ann.message}</p>
                    <p className="announcement-time">{ann.dateTime}</p>
                  </div>
                  <div className="announcement-actions">
                    <button
                      onClick={() => handleEdit(ann._id)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(ann._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Announcement;
