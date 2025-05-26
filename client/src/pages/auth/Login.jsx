/* eslint-disable react/no-unescaped-entities */
import React from "react";
import "./pages.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

const Login = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (data.token) {
        // Save token in localStorage
        localStorage.setItem("token", data.token);
        setMessage("Login Successful");
        navigate("/tasks");
      } else {
        setErrorMessage("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };
  return (
    <div className="addUser">
      <h3>Sign in</h3>
      <form className="addUserForm" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Enter your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Enter your Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="btn btn-primary">
            Login
          </Button>
        </div>
      </form>
      <div className="login">
        <Link to="/forgot-password">forgotten password</Link>
        <p>Don't have Account? </p>
        <Link to="/register" className="btn btn-primary">
          Register
        </Link>
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
};

export default Login;
