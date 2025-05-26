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
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
        User Profile
      </h2>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500 text-sm sm:text-base">{error}</p>}

      {!user ? (
        <p className="text-gray-500">No user found.</p>
      ) : (
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          {/* Mobile Card View */}
          <div className="sm:hidden bg-white p-4">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={`${API_BASE_URL}/api/auth/${user.profilePicture}`}
                alt="Profile"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {user.username}
                </h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-700 mb-4">
                {user.bio || "No bio provided"}
              </p>
              <Link
                to={`/users/edit/${user._id}`}
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Tablet/Desktop Table View */}
          <table className="hidden sm:table min-w-full divide-y divide-gray-300 bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Profile Picture
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Username
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Bio
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr key={user._id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                  <img
                    src={`${API_BASE_URL}/api/auth/${user.profilePicture}`}
                    alt="Profile"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {user.username}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {user.bio || "-"}
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <Link
                    to={`/users/edit/${user._id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit<span className="sr-only">, {user.username}</span>
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
