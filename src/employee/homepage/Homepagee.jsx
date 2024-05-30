// src/components/Homepagee.js
import React from "react";
import "./Homepage.css";

function Homepagee() {
  const data = {
    welcomeMessage: "Hello, John!",
    cards: [
      {
        title: "Events",
        content: "Upcoming company events and meetings",
        details: "Next event: Company Picnic on July 10th at 12 PM",
      },
      {
        title: "Tasks",
        content: "Current tasks and to-dos",
        details: "Complete the Q2 financial report by June 30th",
      },
      {
        title: "Announcements",
        content: "Latest company announcements",
        details: "New office opening in downtown next month",
      },
      {
        title: "Attendance",
        content: "Attendance records and status",
        details: "You have 2 days of leave remaining for this year",
      },
    ],
  };

  return (
    <div className="main--container">
      <section className="welcome-message">
        <h1>{data.welcomeMessage}</h1>
      </section>
      <section className="cards-container">
        {data.cards.map((card, index) => (
          <div className="card" key={index}>
            <h2>{card.title}</h2>
            <p>{card.content}</p>
            <p className="details">{card.details}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Homepagee;
