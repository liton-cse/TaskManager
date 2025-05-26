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
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header with Add Task button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
        <h2 className="text-xl font-semibold sm:text-2xl text-gray-800">
          All Tasks
        </h2>
        <Link to="/tasks/new">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm sm:text-base sm:px-4 sm:py-2 font-medium transition-colors w-full sm:w-auto">
            <strong>Add Task</strong>
          </button>
        </Link>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center mt-8">No tasks found.</p>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-800 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-800 uppercase tracking-wider hidden sm:table-cell">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-800 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-800 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-800 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr key={task._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm sm:text-base text-gray-900">
                    {task.title}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 hidden sm:table-cell">
                    {task.description}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm sm:text-base text-gray-500">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`text-xs sm:text-sm font-medium ${
                        task.status === "Completed"
                          ? "text-green-600"
                          : task.status === "In Progress"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex gap-2">
                      <Link to={`/tasks/edit/${task._id}`}>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded text-xs sm:text-sm font-medium transition-colors">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded text-xs sm:text-sm font-medium transition-colors"
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
