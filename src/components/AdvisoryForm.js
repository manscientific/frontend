import React, { useState } from "react";
import API from "./api";
import AdvisoryResult from "./AdvisoryResult";

const AdvisoryForm = ({ farmer }) => {
  const [location, setLocation] = useState(farmer?.location || "");
  const [soilType, setSoilType] = useState("loam");
  const [sowingMonth, setSowingMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const [advisoryData, setAdvisoryData] = useState(null);
  const [error, setError] = useState("");

  const handleGetAdvisory = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setAdvisoryData(null);

    try {
      const payload = {
        soilType,
      };

      if (location) payload.location = location;
      if (sowingMonth) payload.sowingMonth = Number(sowingMonth);

      const { data } = await API.post("/advisory", payload);
      setAdvisoryData(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to fetch advisory. Check your location and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Inline styles object
  const styles = {
    container: {
      maxWidth: "100%",
      padding: "16px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
    header: {
      textAlign: "center",
      marginBottom: "32px",
      padding: "0 16px",
    },
    icon: {
      fontSize: "48px",
      marginBottom: "16px",
      animation: "float 3s ease-in-out infinite",
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#2c3e50",
      marginBottom: "8px",
      background: "linear-gradient(135deg, #27ae60, #2ecc71)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    subtitle: {
      fontSize: "16px",
      color: "#7f8c8d",
      lineHeight: "1.5",
      maxWidth: "600px",
      margin: "0 auto",
    },
    card: {
      background: "white",
      borderRadius: "20px",
      padding: "24px",
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
      border: "1px solid #e8f5e9",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    inputHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    inputLabel: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#2c3e50",
    },
    optional: {
      fontSize: "12px",
      color: "#95a5a6",
      background: "#f8f9fa",
      padding: "4px 8px",
      borderRadius: "12px",
      fontWeight: "500",
    },
    input: {
      width: "100%",
      padding: "16px",
      border: "2px solid #e8f5e9",
      borderRadius: "12px",
      fontSize: "16px",
      transition: "all 0.3s ease",
      background: "#f8fff9",
    },
    inputFocus: {
      outline: "none",
      borderColor: "#27ae60",
      boxShadow: "0 0 0 3px rgba(39, 174, 96, 0.1)",
      background: "white",
    },
    hint: {
      fontSize: "14px",
      color: "#7f8c8d",
      marginTop: "4px",
    },
    highlight: {
      color: "#27ae60",
      fontWeight: "600",
    },
    soilOptions: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "12px",
      marginTop: "4px",
    },
    soilOption: (isActive) => ({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
      padding: "16px 12px",
      background: isActive ? "#e8f6f3" : "#f8f9fa",
      border: `2px solid ${isActive ? "#27ae60" : "#ecf0f1"}`,
      borderRadius: "12px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontSize: "14px",
      fontWeight: "500",
      color: isActive ? "#27ae60" : "#2c3e50",
      boxShadow: isActive ? "0 4px 12px rgba(39, 174, 96, 0.15)" : "none",
    }),
    soilIcon: (isActive) => ({
      fontSize: "24px",
      transition: "transform 0.3s ease",
      transform: isActive ? "scale(1.1)" : "scale(1)",
    }),
    soilName: {
      fontWeight: "600",
    },
    monthSelector: {
      position: "relative",
      marginTop: "4px",
    },
    dropdown: {
      width: "100%",
      padding: "16px",
      paddingRight: "48px",
      border: "2px solid #e8f5e9",
      borderRadius: "12px",
      fontSize: "16px",
      background: "#f8fff9",
      appearance: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
      color: "#2c3e50",
      fontWeight: "500",
    },
    dropdownIcon: {
      position: "absolute",
      right: "16px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#27ae60",
      pointerEvents: "none",
      fontSize: "12px",
    },
    submitBtn: (isLoading) => ({
      marginTop: "16px",
      padding: "18px 24px",
      background: "linear-gradient(135deg, #27ae60, #2ecc71)",
      color: "white",
      border: "none",
      borderRadius: "14px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: isLoading ? "not-allowed" : "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      boxShadow: "0 4px 20px rgba(39, 174, 96, 0.3)",
      opacity: isLoading ? "0.7" : "1",
    }),
    btnIcon: {
      fontSize: "20px",
    },
    spinner: {
      width: "20px",
      height: "20px",
      border: "3px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "50%",
      borderTopColor: "white",
      animation: "spin 1s ease-in-out infinite",
    },
    error: {
      marginTop: "20px",
      padding: "16px",
      background: "#fee",
      border: "1px solid #ffcccc",
      borderRadius: "12px",
      color: "#c0392b",
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
      animation: "slideDown 0.3s ease",
    },
    errorIcon: {
      fontSize: "18px",
      flexShrink: "0",
    },
  };

  // Define keyframes for animations
  const keyframes = `
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  // Media query styles
  const mediaQueries = `
    @media (max-width: 480px) {
      .advisory-container { padding: 12px; }
      .advisory-header { margin-bottom: 24px; padding: 0 8px; }
      .advisory-icon { font-size: 40px; }
      .advisory-title { font-size: 24px; }
      .advisory-subtitle { font-size: 14px; }
      .advisory-card { padding: 20px; border-radius: 16px; }
      .advisory-form { gap: 20px; }
      .soil-options { grid-template-columns: 1fr; gap: 10px; }
      .soil-option { flex-direction: row; justify-content: flex-start; padding: 14px 16px; }
      .form-input, .month-dropdown { padding: 14px; }
      .submit-btn { padding: 16px 20px; font-size: 15px; }
    }
    @media (min-width: 768px) {
      .advisory-container { max-width: 600px; margin: 0 auto; }
      .advisory-card { padding: 32px; }
      .advisory-title { font-size: 32px; }
      .advisory-subtitle { font-size: 18px; }
    }
    @media (prefers-color-scheme: dark) {
      .advisory-card { background: #1a1a1a; border-color: #2d2d2d; }
      .advisory-subtitle { color: #aaa; }
      .input-label { color: #e0e0e0; }
      .input-optional { color: #888; background: #2d2d2d; }
      .form-input, .month-dropdown { background: #2d2d2d; border-color: #404040; color: #e0e0e0; }
      .soil-option { background: #2d2d2d; border-color: #404040; color: #e0e0e0; }
      .soil-option.active { background: #1e3a2a; border-color: #27ae60; color: #2ecc71; }
      .dropdown-icon { color: #2ecc71; }
    }
  `;

  return (
    <>
      <style>
        {keyframes}
        {mediaQueries}
      </style>
      
      <div className="advisory-container" style={styles.container}>
        <div className="advisory-header" style={styles.header}>
          <div className="advisory-icon" style={styles.icon}>🌾</div>
          <h1 className="advisory-title" style={styles.title}>AI Crop Advisory</h1>
          <p className="advisory-subtitle" style={styles.subtitle}>
            Get personalized recommendations based on weather, soil & season
          </p>
        </div>

        <div className="advisory-card" style={styles.card}>
          <form onSubmit={handleGetAdvisory} className="advisory-form" style={styles.form}>
            {/* Location Input */}
            <div className="input-group" style={styles.inputGroup}>
              <div className="input-header" style={styles.inputHeader}>
                <label className="input-label" style={styles.inputLabel}>Location</label>
                <span className="input-optional" style={styles.optional}>Optional</span>
              </div>
              <input
                type="text"
                placeholder="e.g. Delhi, India"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="form-input"
                style={styles.input}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => {
                  e.target.style.outline = "none";
                  e.target.style.borderColor = "#e8f5e9";
                  e.target.style.boxShadow = "none";
                  e.target.style.background = "#f8fff9";
                }}
              />
              <div className="input-hint" style={styles.hint}>
                Using: <span className="hint-highlight" style={styles.highlight}>
                  {farmer?.location || "Current Location"}
                </span>
              </div>
            </div>

            {/* Soil Type Selection */}
            <div className="input-group" style={styles.inputGroup}>
              <label className="input-label" style={styles.inputLabel}>Soil Type</label>
              <div className="soil-options" style={styles.soilOptions}>
                {[
                  { type: "loam", icon: "🌱", label: "Loam" },
                  { type: "clay", icon: "🟫", label: "Clay" },
                  { type: "sandy", icon: "🏖️", label: "Sandy" }
                ].map((item) => (
                  <button
                    key={item.type}
                    type="button"
                    className={`soil-option ${soilType === item.type ? "active" : ""}`}
                    style={styles.soilOption(soilType === item.type)}
                    onClick={() => setSoilType(item.type)}
                    onMouseEnter={(e) => {
                      if (soilType !== item.type) {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
                        e.currentTarget.style.borderColor = "#bdc3c7";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (soilType !== item.type) {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.borderColor = "#ecf0f1";
                      }
                    }}
                  >
                    <span className="soil-icon" style={styles.soilIcon(soilType === item.type)}>
                      {item.icon}
                    </span>
                    <span className="soil-name" style={styles.soilName}>{item.label}</span>
                  </button>
                ))}
              </div>
              <div className="input-hint" style={styles.hint}>
                Select the dominant soil type of your field
              </div>
            </div>

            {/* Sowing Month Selection */}
            <div className="input-group" style={styles.inputGroup}>
              <div className="input-header" style={styles.inputHeader}>
                <label className="input-label" style={styles.inputLabel}>Sowing Month</label>
                <span className="input-optional" style={styles.optional}>Optional</span>
              </div>
              <div className="month-selector" style={styles.monthSelector}>
                <select
                  value={sowingMonth}
                  onChange={(e) => setSowingMonth(e.target.value)}
                  className="month-dropdown"
                  style={styles.dropdown}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => {
                    e.target.style.outline = "none";
                    e.target.style.borderColor = "#e8f5e9";
                    e.target.style.boxShadow = "none";
                    e.target.style.background = "#f8fff9";
                  }}
                >
                  <option value="">Auto-select (Current Month)</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <div className="dropdown-icon" style={styles.dropdownIcon}>▼</div>
              </div>
              <div className="input-hint" style={styles.hint}>
                Helps AI determine the correct crop season
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`submit-btn ${loading ? "loading" : ""}`}
              style={styles.submitBtn(loading)}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 25px rgba(39, 174, 96, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(39, 174, 96, 0.3)";
                }
              }}
            >
              {loading ? (
                <>
                  <span className="spinner" style={styles.spinner}></span>
                  Analyzing Weather & Soil Data...
                </>
              ) : (
                <>
                  <span className="btn-icon" style={styles.btnIcon}>📊</span>
                  Get Crop Advisory
                </>
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="error-message" style={styles.error}>
              <span className="error-icon" style={styles.errorIcon}>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Results */}
          {advisoryData && <AdvisoryResult data={advisoryData} />}
        </div>
      </div>
    </>
  );
};

export default AdvisoryForm;