import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa"; // Font Awesome icon import

import "./Task.css";
import Navbar from "../navbar/Navbar";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
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

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`https://vtsemp-back.onrender.com/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`https://vtsemp-back.onrender.com/tasks/${id}`, {
        status: newStatus,
      });
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleCreateTask = async () => {
    try {
      const taskData = {
        ...newTask,
        projectMembers: newTask.projectMembers
          .split(",")
          .map((member) => member.trim()),
      };
      const response = await axios.post(
        "https://vtsemp-back.onrender.com/tasks",
        taskData
      );
      setTasks([...tasks, response.data]);
      setShowModal(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const filteredTasks = tasks.filter(
    (task) => filter === "all" || task.status === filter
  );

  return (
    <>
    <Navbar />
    <div className="task-container">
      <header>
        <h1>Tasks</h1>
        <button className="createT-btn" onClick={() => setShowModal(true)}>
          Create Task
        </button>
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
            <button
              className="delete-buttons"
              onClick={() => handleDeleteTask(task.id)}
            >
              <FaTrash className="delete-icon" />
            </button>
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
              <strong>Project Members:</strong>{" "}
              {Array.isArray(task.projectMembers)
                ? task.projectMembers.join(", ")
                : task.projectMembers}
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
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create Task</h2>
            <form>
              <label>
                Project Name:
                <input
                  type="text"
                  name="projectName"
                  value={newTask.projectName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Deadline:
                <input
                  type="date"
                  name="deadline"
                  value={newTask.deadline}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Brief:
                <textarea
                  name="brief"
                  value={newTask.brief}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Project Leader:
                <input
                  type="text"
                  name="projectLeader"
                  value={newTask.projectLeader}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Project Members:
                <input
                  type="text"
                  name="projectMembers"
                  value={newTask.projectMembers}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Status:
                <select
                  name="status"
                  value={newTask.status}
                  onChange={handleInputChange}
                >
                  <option value="completed">Completed</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="yet to start">Yet to Start</option>
                </select>
              </label>
              <button
                className="create-button"
                type="button"
                onClick={handleCreateTask}
              >
                Create
              </button>
              <button type="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default App;
