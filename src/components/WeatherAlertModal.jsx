import React, { useState } from "react";
import axios from "axios";

const WEATHER_API = "https://weather-crop-advisory-production.up.railway.app"; // main1.py backend

const WeatherAlertModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Delhi");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const subscribe = async () => {
    setLoading(true);
    try {
      await axios.post(`${WEATHER_API}/subscribe-weather-alert`, {
        email,
        city,
      });

      setMessage("Subscription successful! You will receive alerts.");
    } catch (err) {
      setMessage("Subscription failed. Try again.");
    }
    setLoading(false);
  };

  // ⭐ Inline Styles
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2000,
    },
    box: {
      background: "#fff",
      padding: "25px",
      borderRadius: "12px",
      width: "350px",
      textAlign: "center",
      boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
      animation: "fadeIn 0.3s ease",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "8px 0",
      borderRadius: "6px",
      border: "1px solid #ccc",
    },
    button: {
      width: "100%",
      padding: "12px",
      background: "#2d7dff",
      color: "white",
      fontWeight: "bold",
      border: "none",
      borderRadius: "6px",
      marginTop: "10px",
      cursor: "pointer",
    },
    closeBtn: {
      background: "#888",
      marginTop: "10px",
      width: "100%",
      padding: "10px",
      color: "#fff",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
    },
    message: {
      marginTop: "12px",
      padding: "10px",
      background: "#eafcff",
      borderLeft: "4px solid #2d7dff",
      borderRadius: "6px",
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <h2>🌦 Weather Alerts</h2>
        <p>Get email alerts when harsh weather is predicted.</p>

        <label>Email Address:</label>
        <input
          type="email"
          placeholder="farmer@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <label>City (optional):</label>
        <input
          type="text"
          placeholder="Delhi"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        />

        <button onClick={subscribe} disabled={loading} style={styles.button}>
          {loading ? "Subscribing..." : "Subscribe"}
        </button>

        {message && <p style={styles.message}>{message}</p>}

        <button style={styles.closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default WeatherAlertModal;
