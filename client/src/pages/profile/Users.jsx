import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";
import "./users.css";

const Users = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch user details.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-5 m-5">
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!user ? (
        <p>No user found.</p>
      ) : (
        <div className="overflow-x-auto mt-6 rounded">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-black">
                  Profile Picture
                </th>
                <th className="px-4 py-2 text-left text-black">Username</th>
                <th className="px-4 py-2 text-left text-black">Email</th>
                <th className="px-4 py-2 text-left text-black">Bio</th>
                <th className="px-4 py-2 text-left text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr key={user._id} className="border-b">
                <td className="px-4 py-2">
                  <img
                    src={`${API_BASE_URL}/api/auth/${user.profilePicture
                      .split("/")
                      .pop()}`}
                    alt="Profile"
                    className="profile-image" // 40px, rounded to circle
                  />
                </td>
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.bio}</td>
                <td className="px-4 py-2">
                  <Link to={`/users/edit/${user._id}`}>
                    <button className="bg-blue-500 text-black px-3 py-1 rounded hover:bg-blue-700">
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
