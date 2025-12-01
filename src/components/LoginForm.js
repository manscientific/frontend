import React, { useState } from "react";
import API from "./api";

const LoginForm = ({ onLoginSuccess, switchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("farmerToken", data.token);
      onLoginSuccess(data);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="card">
      <h2>Farmer Login</h2>
      <form onSubmit={handleLogin}>
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

        <button type="submit">Login</button>
      </form>

      {error && <div className="error">{error}</div>}

      <p style={{ marginTop: "12px", textAlign: "center" }}>
        New farmer?{" "}
        <button type="button" onClick={switchToRegister}>
          Register here
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
