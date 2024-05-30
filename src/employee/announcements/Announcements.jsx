// src/pages/AnnouncementsPage.js
import React from "react";
import "./Announcements.css";

const announcements = [
  {
    date: "2024-05-30",
    time: "10:00 AM",
    message: "Team meeting in the main conference room.",
  },
  {
    date: "2024-06-01",
    time: "2:00 PM",
    message: "Project deadline for the Q2 report.",
  },
  {
    date: "2024-06-05",
    time: "9:00 AM",
    message: "Office maintenance will be conducted.",
  },
];

const AnnouncementsPage = () => {
  return (
    <div className="announcements-page">
      <h1>Announcements</h1>
      {announcements.map((announcement, index) => (
        <AnnouncementCard
          key={index}
          date={announcement.date}
          time={announcement.time}
          message={announcement.message}
        />
      ))}
    </div>
  );
};

const AnnouncementCard = ({ date, time, message }) => {
  return (
    <div className="announcement-card">
      <h3>
        {date} - {time}
      </h3>
      <p>{message}</p>
    </div>
  );
};

export default AnnouncementsPage;
