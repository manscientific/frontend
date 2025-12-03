import React, { useState } from "react";
import API from "./api";
import AdvisoryResult from "./AdvisoryResult";
import styles from "./AdvisoryForm.module.css";

// Importing icons from react-icons
import { 
  FaMapMarkerAlt, 
  FaLeaf, 
  FaCalendarAlt, 
  FaMagic, 
  FaSearch, 
  FaCheckCircle,
  FaExclamationTriangle,
  FaGlobeAmericas,
  FaChevronRight,
  FaSeedling,
  FaCloudSun,
  FaChartLine,
  FaRobot,
  FaTint,
  FaSun,
  FaSnowflake,
  FaUmbrella,
  FaCloudRain,
  FaTree
} from "react-icons/fa";
import { GiWheat } from "react-icons/gi";
import { RiLoader4Line } from "react-icons/ri";

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
          "Failed to fetch advisory. Please check your location and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const soilTypes = [
    { 
      type: "loam", 
      icon: <FaLeaf className={styles.soilIcon} />, 
      label: "Loam", 
      desc: "Rich & Balanced",
      color: "var(--color-emerald)"
    },
    { 
      type: "clay", 
      icon: <FaTint className={styles.soilIcon} />, 
      label: "Clay", 
      desc: "Moist & Heavy",
      color: "var(--color-amber)"
    },
    { 
      type: "sandy", 
      icon: <FaSun className={styles.soilIcon} />, 
      label: "Sandy", 
      desc: "Dry & Light",
      color: "var(--color-gold)"
    }
  ];

  const months = [
    { value: "", label: "Auto-select (Current Season)", icon: <FaCloudSun /> },
    { value: "1", label: "January - Winter Crops", icon: <FaSnowflake /> },
    { value: "2", label: "February - Early Spring", icon: <GiWheat /> },
    { value: "3", label: "March - Spring Sowing", icon: <FaLeaf /> },
    { value: "4", label: "April - Pre-Monsoon", icon: <FaUmbrella /> },
    { value: "5", label: "May - Summer Crops", icon: <FaSun /> },
    { value: "6", label: "June - Monsoon Start", icon: <FaCloudRain /> },
    { value: "7", label: "July - Kharif Season", icon: <FaTree /> },
    { value: "8", label: "August - Main Crop", icon: <GiWheat /> },
    { value: "9", label: "September - Late Monsoon", icon: <FaLeaf /> },
    { value: "10", label: "October - Rabi Prep", icon: <FaLeaf /> },
    { value: "11", label: "November - Winter Prep", icon: <FaCloudSun /> },
    { value: "12", label: "December - Cool Season", icon: <FaSnowflake /> }
  ];

  const features = [
    {
      icon: <FaGlobeAmericas />,
      title: "Satellite Data",
      desc: "Real-time NDVI & weather analysis"
    },
    {
      icon: <FaRobot />,
      title: "AI Predictions",
      desc: "Machine learning crop recommendations"
    },
    {
      icon: <FaChartLine />,
      title: "Yield Optimization",
      desc: "Maximize productivity with data insights"
    },
    {
      icon: <FaMagic />,
      title: "Climate Smart",
      desc: "Adaptive to changing weather patterns"
    }
  ];

  const tips = [
    "Provide location for hyper-local weather insights",
    "Select accurate soil type for better fertilizer recommendations",
    "Set sowing month for seasonal crop planning",
    "Consider crop rotation suggestions for soil health"
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerIconWrapper}>
          <div className={styles.headerIconBg}></div>
          <FaSeedling className={styles.headerIcon} />
        </div>
        
        <h1 className={styles.title}>
          <span className={styles.titleGradient}>AI Crop Advisory</span>
        </h1>
        
        <p className={styles.subtitle}>
          Get intelligent, data-driven recommendations powered by satellite imagery, 
          weather forecasts, and agricultural research
        </p>
      </div>

      <div className={styles.contentWrapper}>
        {/* Main Form Card */}
        <div className={styles.mainCard}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Generate Advisory</h2>
              <p className={styles.cardSubtitle}>Fill in your farm details below</p>
            </div>
            <div className={styles.aiBadge}>
              <FaMagic className={styles.aiIcon} />
              <span>AI-Powered</span>
            </div>
          </div>

          <form onSubmit={handleGetAdvisory} className={styles.form}>
            {/* Location Input */}
            <div className={styles.formGroup}>
              <div className={styles.formLabelWrapper}>
                <label className={styles.formLabel}>
                  <FaMapMarkerAlt className={styles.labelIcon} />
                  Farm Location
                </label>
                <span className={styles.optionalBadge}>Optional</span>
              </div>
              
              <div className={styles.inputWrapper}>
                <FaGlobeAmericas className={styles.inputIcon} />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter city, village, or coordinates..."
                  className={styles.input}
                />
              </div>
              
              <p className={styles.inputHint}>
                Currently using:{" "}
                <span className={styles.highlight}>
                  {farmer?.location || "Auto-detect Location"}
                </span>
              </p>
            </div>

            {/* Soil Type Selection */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                <FaTint className={styles.labelIcon} />
                Soil Type
              </label>
              
              <div className={styles.soilOptions}>
                {soilTypes.map((item) => {
                  const isActive = soilType === item.type;
                  return (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => setSoilType(item.type)}
                      className={`${styles.soilOption} ${isActive ? styles.soilOptionActive : ''}`}
                    >
                      {isActive && (
                        <div className={styles.activeIndicator}>
                          <FaCheckCircle />
                        </div>
                      )}
                      
                      <div className={`${styles.soilIconWrapper} ${isActive ? styles.soilIconWrapperActive : ''}`}>
                        {item.icon}
                      </div>
                      
                      <div className={styles.soilInfo}>
                        <div className={styles.soilName}>{item.label}</div>
                        <div className={styles.soilDesc}>{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
              
              <p className={styles.inputHint}>
                Select the dominant soil type in your farming field
              </p>
            </div>

            {/* Sowing Month Selection */}
            <div className={styles.formGroup}>
              <div className={styles.formLabelWrapper}>
                <label className={styles.formLabel}>
                  <FaCalendarAlt className={styles.labelIcon} />
                  Sowing Season
                </label>
                <span className={styles.recommendedBadge}>Recommended</span>
              </div>
              
              <div className={styles.selectWrapper}>
                <FaCalendarAlt className={styles.selectIcon} />
                <select
                  value={sowingMonth}
                  onChange={(e) => setSowingMonth(e.target.value)}
                  className={styles.select}
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
                <FaChevronRight className={styles.selectArrow} />
              </div>
              
              <p className={styles.inputHint}>
                Select your planned sowing month for season-specific recommendations
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`${styles.submitButton} ${loading ? styles.submitButtonLoading : ''}`}
            >
              {loading ? (
                <>
                  <RiLoader4Line className={styles.spinner} />
                  <span>Analyzing Soil & Weather Data...</span>
                </>
              ) : (
                <>
                  <FaMagic className={styles.buttonIcon} />
                  <span>Generate Smart Advisory</span>
                  <FaChevronRight className={styles.buttonArrow} />
                </>
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className={styles.errorMessage}>
              <FaExclamationTriangle className={styles.errorIcon} />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Side Info Panel */}
        <div className={styles.sidePanel}>
          {/* Features Card */}
          <div className={styles.featuresCard}>
            <h3 className={styles.sidePanelTitle}>Why Use Our Advisory?</h3>
            
            <div className={styles.featuresList}>
              {features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <div>
                    <div className={styles.featureTitle}>{feature.title}</div>
                    <div className={styles.featureDesc}>{feature.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Card */}
          <div className={styles.tipsCard}>
            <h3 className={styles.sidePanelTitle}>Pro Tips</h3>
            
            <div className={styles.tipsList}>
              {tips.map((tip, index) => (
                <div key={index} className={styles.tipItem}>
                  <div className={styles.tipNumber}>{index + 1}</div>
                  <span className={styles.tipText}>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Preview */}
          <div className={styles.statsCard}>
            <h3 className={styles.statsTitle}>Trusted by Farmers</h3>
            
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>15K+</div>
                <div className={styles.statLabel}>Active Users</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>92%</div>
                <div className={styles.statLabel}>Accuracy Rate</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>50+</div>
                <div className={styles.statLabel}>Crop Varieties</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>24/7</div>
                <div className={styles.statLabel}>Data Updates</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advisory Results */}
      {advisoryData && (
        <div className={styles.resultsSection}>
          <AdvisoryResult data={advisoryData} />
        </div>
      )}
    </div>
  );
};

export default AdvisoryForm;