// src/Announcement.js
import React, { useState } from "react";
import "./Announcements.css";

const Announcement = () => {
  const [announcement, setAnnouncement] = useState("");
  const [announcements, setAnnouncements] = useState([]);

  const handleAnnouncementChange = (e) => {
    setAnnouncement(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (announcement.trim()) {
      const newAnnouncement = {
        id: Date.now(),
        message: announcement,
        dateTime: new Date().toLocaleString(),
      };
      setAnnouncements([...announcements, newAnnouncement]);
      setAnnouncement("");
    }
  };

  const handleEdit = (id, updatedMessage, updatedDateTime) => {
    const updatedAnnouncements = announcements.map((ann) =>
      ann.id === id
        ? { ...ann, message: updatedMessage, dateTime: updatedDateTime }
        : ann
    );
    setAnnouncements(updatedAnnouncements);
  };

  const handleDelete = (id) => {
    const updatedAnnouncements = announcements.filter((ann) => ann.id !== id);
    setAnnouncements(updatedAnnouncements);
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
                <div key={ann.id} className="announcement-card">
                  <div className="announcement-content">
                    <p>{ann.message}</p>
                    <p className="announcement-time">{ann.dateTime}</p>
                  </div>
                  <div className="announcement-actions">
                    <button
                      onClick={() => {
                        const updatedMessage = prompt(
                          "Enter updated announcement",
                          ann.message
                        );
                        const updatedDateTime = prompt(
                          "Enter updated date and time",
                          ann.dateTime
                        );
                        handleEdit(ann.id, updatedMessage, updatedDateTime);
                      }}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(ann.id)}
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
