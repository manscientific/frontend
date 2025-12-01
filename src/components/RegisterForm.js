import React, { useState } from "react";
import API from "./api";

const RegisterForm = ({ onRegisterSuccess, switchToLogin }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState(""); // e.g. "Delhi,IN"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
        location,
      });
      localStorage.setItem("farmerToken", data.token);
      setSuccess("Registration successful!");
      onRegisterSuccess(data);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="card">
      <h2>Farmer Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Location (e.g. Delhi,IN)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <p style={{ marginTop: "12px", textAlign: "center" }}>
        Already have an account?{" "}
        <button type="button" onClick={switchToLogin}>
          Login here
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;
