import "./Homepage.css";
function Homepagee() {
  return (
    <div className="main--container">
      <section className="welcome-message">
        <h1>Hello, John!</h1>
      </section>
      <section className="cards-container">
        <div className="card">
          <h2>Events</h2>
          <p>Upcoming company events and meetings</p>
        </div>
        <div className="card">
          <h2>Tasks</h2>
          <p>Current tasks and to-dos</p>
        </div>
        <div className="card">
          <h2>Announcements</h2>
          <p>Latest company announcements</p>
        </div>
        <div className="card">
          <h2>Attendance</h2>
          <p>Attendance records and status</p>
        </div>
      </section>
    </div>
  );
}

export default Homepagee;
