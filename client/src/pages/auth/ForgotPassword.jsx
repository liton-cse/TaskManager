/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import "./pages.css";
import { Button } from "react-bootstrap";
import axios from "axios";

const ForgotPassword = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/auth/forgot-password`,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage(data.message || "Password reset link sent! Check your email.");
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addUser">
      <h3>Forget Password</h3>
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
          <Button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Sending..." : "Enter"}
          </Button>
        </div>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ForgotPassword;
