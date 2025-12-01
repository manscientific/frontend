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

  const styles = {
    container: {
      maxWidth: "100%",
      padding: "20px",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      background: "linear-gradient(135deg, #f0f9f0 0%, #e6f7e6 100%)",
      minHeight: "100vh",
    },
    header: {
      textAlign: "center",
      marginBottom: "40px",
      padding: "0 16px",
    },
    iconWrapper: {
      position: "relative",
      display: "inline-block",
      marginBottom: "20px",
    },
    iconBg: {
      position: "absolute",
      top: "-10px",
      left: "-10px",
      right: "-10px",
      bottom: "-10px",
      background: "linear-gradient(135deg, #27ae60, #2ecc71)",
      borderRadius: "50%",
      opacity: "0.2",
      filter: "blur(15px)",
    },
    icon: {
      fontSize: "64px",
      position: "relative",
      zIndex: "1",
      animation: "floatIcon 4s ease-in-out infinite",
    },
    title: {
      fontSize: "36px",
      fontWeight: "800",
      color: "#1a472a",
      marginBottom: "12px",
      letterSpacing: "-0.5px",
    },
    titleGradient: {
      background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 50%, #1e8449 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    subtitle: {
      fontSize: "18px",
      color: "#2d6a4f",
      lineHeight: "1.6",
      maxWidth: "600px",
      margin: "0 auto",
      fontWeight: "500",
      opacity: "0.9",
    },
    card: {
      background: "linear-gradient(165deg, #ffffff 0%, #f8fff9 100%)",
      borderRadius: "28px",
      padding: "32px",
      boxShadow: `
        0 20px 60px rgba(39, 174, 96, 0.15),
        0 5px 15px rgba(0, 0, 0, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.8)
      `,
      border: "1px solid rgba(39, 174, 96, 0.2)",
      position: "relative",
      overflow: "hidden",
    },
    cardBg: {
      position: "absolute",
      top: "0",
      right: "0",
      width: "200px",
      height: "200px",
      background: "linear-gradient(135deg, rgba(39, 174, 96, 0.1) 0%, rgba(46, 204, 113, 0.05) 100%)",
      borderRadius: "0 28px 0 100px",
      zIndex: "0",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "28px",
      position: "relative",
      zIndex: "1",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    inputHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    inputLabel: {
      fontSize: "16px",
      fontWeight: "700",
      color: "#1a472a",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    labelIcon: {
      fontSize: "18px",
    },
    optional: {
      fontSize: "13px",
      color: "#27ae60",
      background: "rgba(39, 174, 96, 0.1)",
      padding: "6px 12px",
      borderRadius: "20px",
      fontWeight: "600",
      border: "1px solid rgba(39, 174, 96, 0.2)",
    },
    inputWrapper: {
      position: "relative",
    },
    input: {
      width: "100%",
      padding: "18px 20px 18px 50px",
      border: "2px solid #e8f5e9",
      borderRadius: "16px",
      fontSize: "16px",
      transition: "all 0.3s ease",
      background: "#ffffff",
      color: "#1a472a",
      fontWeight: "500",
      boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.04)",
    },
    inputIcon: {
      position: "absolute",
      left: "20px",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "20px",
      color: "#27ae60",
      zIndex: "1",
    },
    hint: {
      fontSize: "14px",
      color: "#2d6a4f",
      marginTop: "6px",
      paddingLeft: "8px",
      fontWeight: "500",
      opacity: "0.8",
    },
    highlight: {
      color: "#27ae60",
      fontWeight: "700",
      background: "rgba(39, 174, 96, 0.1)",
      padding: "2px 8px",
      borderRadius: "6px",
    },
    soilOptions: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "15px",
      marginTop: "8px",
    },
    soilOption: (isActive) => ({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "12px",
      padding: "20px 15px",
      background: isActive 
        ? "linear-gradient(135deg, #e8f6f3 0%, #d4f1e4 100%)" 
        : "#ffffff",
      border: `2px solid ${isActive ? "#27ae60" : "#e8f5e9"}`,
      borderRadius: "16px",
      cursor: "pointer",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      fontSize: "14px",
      fontWeight: "600",
      color: isActive ? "#1a472a" : "#2d6a4f",
      boxShadow: isActive 
        ? "0 10px 25px rgba(39, 174, 96, 0.2), 0 5px 10px rgba(0, 0, 0, 0.04)" 
        : "0 4px 12px rgba(0, 0, 0, 0.05)",
      position: "relative",
      overflow: "hidden",
    }),
    soilOptionBg: (isActive) => ({
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      background: isActive ? "linear-gradient(135deg, rgba(39, 174, 96, 0.1) 0%, rgba(46, 204, 113, 0.05) 100%)" : "transparent",
      zIndex: "0",
    }),
    soilIcon: (isActive) => ({
      fontSize: "32px",
      transition: "all 0.4s ease",
      transform: isActive ? "scale(1.1) rotate(5deg)" : "scale(1)",
      position: "relative",
      zIndex: "1",
    }),
    soilName: {
      fontWeight: "700",
      position: "relative",
      zIndex: "1",
    },
    monthSelector: {
      position: "relative",
      marginTop: "8px",
    },
    dropdown: {
      width: "100%",
      padding: "18px 20px 18px 50px",
      border: "2px solid #e8f5e9",
      borderRadius: "16px",
      fontSize: "16px",
      background: "#ffffff",
      appearance: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
      color: "#1a472a",
      fontWeight: "500",
      boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.04)",
    },
    dropdownIcon: {
      position: "absolute",
      right: "20px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#27ae60",
      pointerEvents: "none",
      fontSize: "14px",
    },
    submitBtn: (isLoading) => ({
      marginTop: "20px",
      padding: "22px 30px",
      background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 50%, #1e8449 100%)",
      color: "white",
      border: "none",
      borderRadius: "18px",
      fontSize: "18px",
      fontWeight: "700",
      cursor: isLoading ? "not-allowed" : "pointer",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      boxShadow: "0 10px 30px rgba(39, 174, 96, 0.3), 0 5px 15px rgba(0, 0, 0, 0.1)",
      position: "relative",
      overflow: "hidden",
      letterSpacing: "0.5px",
    }),
    submitBtnHover: {
      transform: "translateY(-3px)",
      boxShadow: "0 15px 40px rgba(39, 174, 96, 0.4), 0 8px 20px rgba(0, 0, 0, 0.15)",
    },
    submitBtnActive: {
      transform: "translateY(1px)",
      boxShadow: "0 5px 20px rgba(39, 174, 96, 0.3), 0 3px 10px rgba(0, 0, 0, 0.1)",
    },
    btnIcon: {
      fontSize: "22px",
      position: "relative",
      zIndex: "1",
    },
    spinner: {
      width: "22px",
      height: "22px",
      border: "3px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "50%",
      borderTopColor: "white",
      animation: "spin 1s linear infinite",
      position: "relative",
      zIndex: "1",
    },
    error: {
      marginTop: "24px",
      padding: "20px",
      background: "linear-gradient(135deg, #fff0f0 0%, #ffe6e6 100%)",
      border: "2px solid #ffcccc",
      borderRadius: "16px",
      color: "#c0392b",
      display: "flex",
      alignItems: "center",
      gap: "15px",
      animation: "slideDown 0.4s ease-out",
      boxShadow: "0 5px 15px rgba(192, 57, 43, 0.1)",
    },
    errorIcon: {
      fontSize: "22px",
      flexShrink: "0",
    },
    successBadge: {
      position: "absolute",
      top: "-10px",
      right: "30px",
      background: "linear-gradient(135deg, #27ae60, #2ecc71)",
      color: "white",
      padding: "8px 20px",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "700",
      boxShadow: "0 5px 15px rgba(39, 174, 96, 0.3)",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
  };

  const keyframes = `
    @keyframes floatIcon {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
  `;

  const mediaQueries = `
    @media (max-width: 640px) {
      .advisory-container { padding: 16px; }
      .advisory-header { margin-bottom: 30px; }
      .advisory-icon { font-size: 56px; }
      .advisory-title { font-size: 30px; }
      .advisory-subtitle { font-size: 16px; }
      .advisory-card { padding: 24px; border-radius: 24px; }
      .advisory-form { gap: 24px; }
      .soil-options { grid-template-columns: 1fr; gap: 12px; }
      .soil-option { flex-direction: row; justify-content: flex-start; padding: 18px 20px; }
      .submit-btn { padding: 20px 24px; font-size: 17px; }
    }
    @media (min-width: 768px) {
      .advisory-container { max-width: 700px; margin: 0 auto; }
      .advisory-card { padding: 40px; }
      .advisory-title { font-size: 42px; }
      .advisory-subtitle { font-size: 20px; }
    }
    @media (prefers-color-scheme: dark) {
      .advisory-container { background: linear-gradient(135deg, #0a2914 0%, #051c0e 100%); }
      .advisory-card { background: linear-gradient(165deg, #1a1a1a 0%, #15231a 100%); }
      .advisory-title { color: #d4f1e4; }
      .advisory-subtitle { color: #a3d9b1; }
      .input-label { color: #d4f1e4; }
      .input-optional { background: rgba(39, 174, 96, 0.2); }
      .form-input, .month-dropdown { 
        background: #2a2a2a; 
        border-color: #2d6a4f; 
        color: #d4f1e4;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
      }
      .soil-option { background: #2a2a2a; border-color: #2d6a4f; color: #a3d9b1; }
      .soil-option.active { background: linear-gradient(135deg, #1e3a2a 0%, #15231a 100%); }
      .error { background: linear-gradient(135deg, #2a1a1a 0%, #331a1a 100%); }
    }
  `;

  const soilTypes = [
    { type: "loam", icon: "🌱", label: "Loam", desc: "Rich & Balanced" },
    { type: "clay", icon: "🟫", label: "Clay", desc: "Moist & Heavy" },
    { type: "sandy", icon: "🏖️", label: "Sandy", desc: "Dry & Light" }
  ];

  return (
    <>
      <style>
        {keyframes}
        {mediaQueries}
      </style>
      
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.iconWrapper}>
            <div style={styles.iconBg}></div>
            <div style={styles.icon}>🌾</div>
          </div>
          <h1 style={styles.title}>
            <span style={styles.titleGradient}>AI Crop Advisory</span>
          </h1>
          <p style={styles.subtitle}>
            Get personalized, intelligent recommendations based on real-time weather data, 
            soil analysis, and seasonal patterns
          </p>
        </div>

        <div style={styles.card}>
          <div style={styles.cardBg}></div>
          <div style={styles.successBadge}>
            <span>✨</span>
            Powered by AI & Satellite Data
          </div>
          
          <form onSubmit={handleGetAdvisory} style={styles.form}>
            {/* Location Input */}
            <div style={styles.inputGroup}>
              <div style={styles.inputHeader}>
                <label style={styles.inputLabel}>
                  <span style={styles.labelIcon}>📍</span>
                  Farm Location
                </label>
                <span style={styles.optional}>OPTIONAL</span>
              </div>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>🏡</span>
                <input
                  type="text"
                  placeholder="Enter city or village name..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#27ae60";
                    e.target.style.boxShadow = "0 0 0 4px rgba(39, 174, 96, 0.15), inset 0 2px 4px rgba(0, 0, 0, 0.04)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e8f5e9";
                    e.target.style.boxShadow = "inset 0 2px 4px rgba(0, 0, 0, 0.04)";
                  }}
                />
              </div>
              <div style={styles.hint}>
                Currently using: <span style={styles.highlight}>
                  {farmer?.location || "Auto-detect Location"}
                </span>
              </div>
            </div>

            {/* Soil Type Selection */}
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>
                <span style={styles.labelIcon}>🌍</span>
                Soil Type
              </label>
              <div style={styles.soilOptions}>
                {soilTypes.map((item) => {
                  const isActive = soilType === item.type;
                  return (
                    <button
                      key={item.type}
                      type="button"
                      style={styles.soilOption(isActive)}
                      onClick={() => setSoilType(item.type)}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.transform = "translateY(-4px)";
                          e.currentTarget.style.boxShadow = "0 15px 30px rgba(39, 174, 96, 0.15), 0 8px 15px rgba(0, 0, 0, 0.06)";
                          e.currentTarget.style.borderColor = "#bdc3c7";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.05)";
                          e.currentTarget.style.borderColor = "#e8f5e9";
                        }
                      }}
                    >
                      <div style={styles.soilOptionBg(isActive)}></div>
                      <span style={styles.soilIcon(isActive)}>{item.icon}</span>
                      <div>
                        <div style={styles.soilName}>{item.label}</div>
                        <div style={{ fontSize: "12px", opacity: "0.7", marginTop: "4px" }}>
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div style={styles.hint}>
                Select the dominant soil type in your farming field
              </div>
            </div>

            {/* Sowing Month Selection */}
            <div style={styles.inputGroup}>
              <div style={styles.inputHeader}>
                <label style={styles.inputLabel}>
                  <span style={styles.labelIcon}>📅</span>
                  Sowing Season
                </label>
                <span style={styles.optional}>RECOMMENDED</span>
              </div>
              <div style={styles.monthSelector}>
                <span style={styles.inputIcon}>🌱</span>
                <select
                  value={sowingMonth}
                  onChange={(e) => setSowingMonth(e.target.value)}
                  style={styles.dropdown}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#27ae60";
                    e.target.style.boxShadow = "0 0 0 4px rgba(39, 174, 96, 0.15), inset 0 2px 4px rgba(0, 0, 0, 0.04)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e8f5e9";
                    e.target.style.boxShadow = "inset 0 2px 4px rgba(0, 0, 0, 0.04)";
                  }}
                >
                  <option value="">🌤️ Auto-select (Current Weather)</option>
                  <option value="1">❄️ January - Winter Crops</option>
                  <option value="2">🌼 February - Early Spring</option>
                  <option value="3">🌸 March - Spring Sowing</option>
                  <option value="4">🌦️ April - Pre-Monsoon</option>
                  <option value="5">🌞 May - Summer Crops</option>
                  <option value="6">☔ June - Monsoon Start</option>
                  <option value="7">🌧️ July - Kharif Season</option>
                  <option value="8">🌾 August - Main Crop</option>
                  <option value="9">🌻 September - Late Monsoon</option>
                  <option value="10">🍂 October - Rabi Prep</option>
                  <option value="11">🌥️ November - Winter Prep</option>
                  <option value="12">🎄 December - Cool Season</option>
                </select>
                <div style={styles.dropdownIcon}>▼</div>
              </div>
              <div style={styles.hint}>
                Select your planned sowing month for season-specific recommendations
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={styles.submitBtn(loading)}
              onMouseEnter={(e) => {
                if (!loading) {
                  Object.assign(e.currentTarget.style, styles.submitBtnHover);
                  e.currentTarget.style.animation = "pulse 2s infinite";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(39, 174, 96, 0.3), 0 5px 15px rgba(0, 0, 0, 0.1)";
                  e.currentTarget.style.animation = "none";
                }
              }}
              onMouseDown={(e) => {
                if (!loading) {
                  Object.assign(e.currentTarget.style, styles.submitBtnActive);
                }
              }}
              onMouseUp={(e) => {
                if (!loading && e.currentTarget.matches(':hover')) {
                  Object.assign(e.currentTarget.style, styles.submitBtnHover);
                }
              }}
            >
              {loading ? (
                <>
                  <span style={styles.spinner}></span>
                  🌍 Analyzing Weather & Soil...
                </>
              ) : (
                <>
                  <span style={styles.btnIcon}>✨</span>
                  Generate Smart Advisory
                  <span style={{ marginLeft: "8px", fontSize: "20px" }}>→</span>
                </>
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div style={styles.error}>
              <span style={styles.errorIcon}>⚠️</span>
              <span style={{ flex: "1" }}>{error}</span>
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