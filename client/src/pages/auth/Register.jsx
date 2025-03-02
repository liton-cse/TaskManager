import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./pages.css";

function Register() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const { id } = useParams(); // To get the user id for editing (if available)
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  // If editing, fetch user details
  useEffect(() => {
    if (id) {
      // Fetch user details for editing
      axios
        .get(`${API_BASE_URL}/api/auth/profile/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          setUserName(res.data.username);
          setEmail(res.data.email);
          setBio(res.data.bio);
        })
        .catch((err) => {
          setErrorMessage("Error fetching user details.");
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); // Reset error message

    // Create FormData object
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("bio", bio);

    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      let response;
      if (id) {
        // Editing user
        response = await axios.put(
          `${API_BASE_URL}/api/auth/profile/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        // Registering new user
        response = await axios.post(
          `${API_BASE_URL}/api/auth/register`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }

      if (response.data.token || response.data.message) {
        setMessage(
          id ? "User updated successfully" : "User registered successfully"
        );

        // Ensure navigation after state update
        setTimeout(() => {
          if (id) {
            navigate("/users"); // Navigate to users list if updating
          } else {
            navigate("/login"); // Navigate to login after registering
          }
        }, 500); // Adding a short delay for better UX
      } else {
        setErrorMessage(id ? "Update failed" : "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      // Enhanced error handling
      if (error.response) {
        // Handle known error responses
        setErrorMessage(
          error.response.data?.message || "An error occurred. Please try again."
        );
      } else if (error.request) {
        // Network errors or no response from server
        setErrorMessage("Network error. Please check your connection.");
      } else {
        // Generic error
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="addUser">
      <h3>{id ? "Edit User" : "Sign Up"}</h3>
      <form className="addUserForm" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            autoComplete="off"
            placeholder="Enter your username"
            required
            onChange={(e) => setUserName(e.target.value)}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            required
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          {!id && (
            <>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                autoComplete="off"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          )}

          <label htmlFor="profilePicture">Profile Picture:</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />

          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            rows="6"
            maxLength="1200"
            placeholder="Write your bio (max 200 words)..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>

          <Button type="submit" className="btn btn-primary" variant="success">
            {isLoading ? "Loading..." : id ? "Update User" : "Sign up"}
          </Button>
        </div>
      </form>

      {!id && (
        <div className="login">
          <p>{"Already have an account?"}</p>
          <Link to={"/login"} className="btn btn-primary">
            {"Login"}
          </Link>
        </div>
      )}

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
}

export default Register;
