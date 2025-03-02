import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import "../auth/pages.css";

const TaskForm = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams(); // Get task ID from URL
  const navigate = useNavigate();

  // State variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // If there's an ID, fetch the task details for editing
    if (id) {
      setLoading(true);
      axios
        .get(`${API_BASE_URL}/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          setTitle(res.data.title);
          setDescription(res.data.description);
          setStatus(res.data.status);
          setDueDate(res.data.dueDate?.split("T")[0]); // Ensure correct date format
          setLoading(false);
        })
        .catch((err) => {
          setError("Error fetching task.");
          console.error("Error fetching task:", err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, status, dueDate };

    try {
      if (id) {
        await axios.put(`${API_BASE_URL}/api/tasks/${id}`, taskData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      } else {
        await axios.post(`${API_BASE_URL}/api/tasks/`, taskData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
      }
      navigate("/tasks"); // Redirect to tasks list after saving
    } catch (err) {
      setError("Error saving task. Please try again.");
      console.error("Error saving task:", err);
    }
  };

  return (
    <div className="addUser">
      <h3>{id ? "Edit Task" : "Add Task"}</h3>
      <form className="addUserForm" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <label htmlFor="dueDate">Due Date:</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {id ? "Update Task" : "Create Task"}
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default TaskForm;
