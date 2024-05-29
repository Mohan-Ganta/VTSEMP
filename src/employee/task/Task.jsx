import React, { useState } from "react";
import "./Task.css";

const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      projectName: "Project Alpha",
      deadline: "2024-06-01",
      brief: "Lorem ipsum dolor sit amet.",
      projectLeader: "Alice",
      projectMembers: ["Bob", "Charlie"],
      status: "ongoing",
    },
    {
      id: 2,
      projectName: "Project Beta",
      deadline: "2024-07-15",
      brief: "Consectetur adipiscing elit.",
      projectLeader: "David",
      projectMembers: ["Eve", "Frank"],
      status: "yet to start",
    },
    {
      id: 3,
      projectName: "Project Gamma",
      deadline: "2024-05-30",
      brief: "Sed do eiusmod tempor incididunt.",
      projectLeader: "Grace",
      projectMembers: ["Heidi", "Ivan"],
      status: "completed",
    },
  ]);

  const [filter, setFilter] = useState("all");

  const handleStatusChange = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTasks = tasks.filter(
    (task) => filter === "all" || task.status === filter
  );

  return (
    <div className="App">
      <header>
        <h1>Tasks</h1>
        <select onChange={handleFilterChange} value={filter}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="ongoing">Ongoing</option>
          <option value="yet to start">Yet to Start</option>
        </select>
      </header>
      <div className="task-list">
        {filteredTasks.map((task) => (
          <div className="task-card" key={task.id}>
            <h2>{task.projectName}</h2>
            <p>
              <strong>Deadline:</strong> {task.deadline}
            </p>
            <p>
              <strong>Brief:</strong> {task.brief}
            </p>
            <p>
              <strong>Project Leader:</strong> {task.projectLeader}
            </p>
            <p>
              <strong>Project Members:</strong> {task.projectMembers.join(", ")}
            </p>
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(task.id, e.target.value)}
            >
              <option value="completed">Completed</option>
              <option value="ongoing">Ongoing</option>
              <option value="yet to start">Yet to Start</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
