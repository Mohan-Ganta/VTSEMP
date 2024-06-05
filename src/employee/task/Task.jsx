import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Task.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const [newTask, setNewTask] = useState({
    projectName: "",
    deadline: "",
    brief: "",
    projectLeader: "",
    projectMembers: "",
    status: "yet to start",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://vtsemp-back.onrender.com/tasks"
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`https://vtsemp-back.onrender.com/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
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
