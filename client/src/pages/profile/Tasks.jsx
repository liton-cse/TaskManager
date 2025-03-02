import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Tasks = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [tasks, setTasks] = useState([]); // Initialize tasks as an empty array
  const [loading, setLoading] = useState(true); // To show a loading state
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/tasks/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // Ensure the response data is an array
        if (Array.isArray(res.data)) {
          setTasks(res.data);
        } else {
          setError("Received data is not an array.");
        }
      })
      .catch((err) => {
        setError("Error fetching tasks.");
        console.error("Error fetching tasks:", err);
      })
      .finally(() => setLoading(false)); // Stop loading after fetch
  }, []);

  // Show loading message or error if any
  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
      alert("Task deleted successfully.");
      // Optionally refetch tasks or remove the deleted task from state
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task.");
    }
  };

  return (
    <div className="p-5 m-5">
      <h2 className="text-2xl font-semibold mb-4"> All Tasks</h2>
      <Link to="/tasks/new">
        <button className="bg-blue-500 text-black  px-4 py-2 rounded hover:bg-blue-700 mb-4">
          <strong>Add Task</strong>
        </button>
      </Link>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="overflow-x-auto mt-6 rounded">
          <table className="min-w-full bg-white border border-gray-200 rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-black">Title</th>
                <th className="px-4 py-2 text-left text-black">Description</th>
                <th className="px-4 py-2 text-left text-black">Due Date</th>
                <th className="px-4 py-2 text-left text-black">Status</th>
                <th className="px-4 py-2 text-left text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="border-b">
                  <td className="px-4 py-2 ">{task.title}</td>
                  <td className="px-4 py-2 ">{task.description}</td>
                  <td className="px-4 py-2 ">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`font-semibold ${
                        task.status === "Completed"
                          ? "text-green-500"
                          : task.status === "In Progress"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex justify-start space-x-2">
                      <Link to={`/tasks/edit/${task._id}`}>
                        <button className="bg-blue-500 text-black px-3 py-1 rounded hover:bg-blue-700">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="bg-red-500 text-black px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Tasks;
