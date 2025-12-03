import React, { useState, useEffect } from "react";
import API from "./api";
import AdvisoryResult from "./AdvisoryResult";
import styles from "./AdvisoryForm.module.css";

// Importing icons from react-icons
import { 
  FaMapMarkerAlt, 
  FaLeaf, 
  FaCalendarAlt, 
  FaMagic, 
  FaGlobeAmericas,
  FaChevronRight,
  FaSeedling,
  FaCheckCircle,
  FaExclamationTriangle,
  FaLanguage,
  FaAngleDown
} from "react-icons/fa";
import { RiLoader4Line } from "react-icons/ri";

// Import translations
import { translations, languages } from "./translations";

const AdvisoryForm = ({ farmer }) => {
  const [location, setLocation] = useState(farmer?.location || "");
  const [soilType, setSoilType] = useState("loam");
  const [sowingMonth, setSowingMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const [advisoryData, setAdvisoryData] = useState(null);
  const [error, setError] = useState("");
  const [currentLang, setCurrentLang] = useState("en");
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const t = translations[currentLang];

  useEffect(() => {
    // Set language from localStorage or browser preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && languages[savedLang]) {
      setCurrentLang(savedLang);
    }
  }, []);

  const handleLanguageChange = (langCode) => {
    setCurrentLang(langCode);
    localStorage.setItem('preferredLanguage', langCode);
    setShowLangDropdown(false);
  };

  const handleGetAdvisory = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setAdvisoryData(null);

    try {
      const payload = {
        soilType,
        language: currentLang
      };

      if (location) payload.location = location;
      if (sowingMonth) payload.sowingMonth = Number(sowingMonth);

      const { data } = await API.post("/advisory", payload);
      setAdvisoryData(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          t.errors.fetchAdvisory || "Failed to fetch advisory. Please check your location and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const soilTypes = [
    { 
      type: "loam", 
      icon: <FaLeaf className={styles.soilIcon} />, 
      label: t.soilTypes.loam.label,
      desc: t.soilTypes.loam.desc,
    },
    { 
      type: "clay", 
      icon: <div className={styles.soilIcon}>🟫</div>, 
      label: t.soilTypes.clay.label,
      desc: t.soilTypes.clay.desc,
    },
    { 
      type: "sandy", 
      icon: <div className={styles.soilIcon}>🏖️</div>, 
      label: t.soilTypes.sandy.label,
      desc: t.soilTypes.sandy.desc,
    }
  ];

  const months = t.months.map((month, index) => ({
    value: index === 0 ? "" : index.toString(),
    label: month,
    icon: getMonthIcon(index)
  }));

  function getMonthIcon(monthIndex) {
    const icons = ["🌤️", "❄️", "🌼", "🌸", "🌦️", "🌞", "☔", "🌧️", "🌾", "🌻", "🍂", "🌥️", "🎄"];
    return icons[monthIndex] || "📅";
  }

  return (
    <div className={styles.container}>
      {/* Language Selector */}
      <div className={styles.languageSelector}>
        <button 
          className={styles.languageButton}
          onClick={() => setShowLangDropdown(!showLangDropdown)}
        >
          <FaLanguage className={styles.langIcon} />
          <span className={styles.langName}>{languages[currentLang]}</span>
          <FaAngleDown className={styles.langArrow} />
        </button>
        
        {showLangDropdown && (
          <div className={styles.languageDropdown}>
            {Object.entries(languages).map(([code, name]) => (
              <button
                key={code}
                className={`${styles.langOption} ${currentLang === code ? styles.langOptionActive : ''}`}
                onClick={() => handleLanguageChange(code)}
              >
                <span className={styles.langFlag}>{getFlagEmoji(code)}</span>
                <span className={styles.langText}>{name}</span>
                {currentLang === code && (
                  <FaCheckCircle className={styles.langCheck} />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Overlay for closing dropdown */}
      {showLangDropdown && (
        <div className={styles.dropdownOverlay} onClick={() => setShowLangDropdown(false)} />
      )}

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerIconWrapper}>
          <div className={styles.headerIconBg}></div>
          <FaSeedling className={styles.headerIcon} />
        </div>
        
        <h1 className={styles.title}>
          <span className={styles.titleGradient}>{t.title}</span>
        </h1>
        
        <p className={styles.subtitle}>
          {t.subtitle}
        </p>
      </div>

      <div className={styles.contentWrapper}>
        {/* Main Form Card */}
        <div className={styles.mainCard}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>{t.formTitle}</h2>
              <p className={styles.cardSubtitle}>{t.formSubtitle}</p>
            </div>
            <div className={styles.aiBadge}>
              <FaMagic className={styles.aiIcon} />
              <span>{t.aiBadge}</span>
            </div>
          </div>

          <form onSubmit={handleGetAdvisory} className={styles.form}>
            {/* Location Input */}
            <div className={styles.formGroup}>
              <div className={styles.formLabelWrapper}>
                <label className={styles.formLabel}>
                  <FaMapMarkerAlt className={styles.labelIcon} />
                  {t.location.label}
                </label>
                <span className={styles.optionalBadge}>{t.optional}</span>
              </div>
              
              <div className={styles.inputWrapper}>
                <FaGlobeAmericas className={styles.inputIcon} />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t.location.placeholder}
                  className={styles.input}
                />
              </div>
              
              <p className={styles.inputHint}>
                {t.location.hint}:{" "}
                <span className={styles.highlight}>
                  {farmer?.location || t.location.autoDetect}
                </span>
              </p>
            </div>

            {/* Soil Type Selection */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                <div className={styles.labelIcon}>🌍</div>
                {t.soil.label}
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
                {t.soil.hint}
              </p>
            </div>

            {/* Sowing Month Selection */}
            <div className={styles.formGroup}>
              <div className={styles.formLabelWrapper}>
                <label className={styles.formLabel}>
                  <FaCalendarAlt className={styles.labelIcon} />
                  {t.sowing.label}
                </label>
                <span className={styles.recommendedBadge}>{t.recommended}</span>
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
                {t.sowing.hint}
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
                  <span>{t.buttons.loading}</span>
                </>
              ) : (
                <>
                  <FaMagic className={styles.buttonIcon} />
                  <span>{t.buttons.generate}</span>
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
            <h3 className={styles.sidePanelTitle}>{t.features.title}</h3>
            
            <div className={styles.featuresList}>
              {t.features.items.map((feature, index) => (
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
            <h3 className={styles.sidePanelTitle}>{t.tips.title}</h3>
            
            <div className={styles.tipsList}>
              {t.tips.items.map((tip, index) => (
                <div key={index} className={styles.tipItem}>
                  <div className={styles.tipNumber}>{index + 1}</div>
                  <span className={styles.tipText}>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Preview */}
          <div className={styles.statsCard}>
            <h3 className={styles.statsTitle}>{t.stats.title}</h3>
            
            <div className={styles.statsGrid}>
              {t.stats.items.map((stat, index) => (
                <div key={index} className={styles.statItem}>
                  <div className={styles.statNumber}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Advisory Results */}
      {advisoryData && (
        <div className={styles.resultsSection}>
          <AdvisoryResult data={advisoryData} language={currentLang} />
        </div>
      )}
    </div>
  );
};

// Helper function for flag emojis
function getFlagEmoji(langCode) {
  const flags = {
    'en': '🇺🇸', // English (US flag)
    'hi': '🇮🇳', // Hindi (Indian flag)
    'kn': '🇮🇳', // Kannada (Indian flag)
    'bn': '🇧🇩', // Bengali (Bangladesh flag)
    'ur': '🇵🇰', // Urdu (Pakistan flag)
    'mr': '🇮🇳', // Marathi (Indian flag)
    'ta': '🇮🇳', // Tamil (Indian flag)
    'ml': '🇮🇳', // Malayalam (Indian flag)
  };
  return flags[langCode] || '🌐';
}

export default AdvisoryForm;