import React from "react";
import { useNavigate } from "react-router-dom";

const ScoreBar = ({ score, max = 100 }) => {
  const percent = Math.min(100, Math.max(0, (score / max) * 100));
  return (
    <div className="score-bar">
      <div
        className="score-bar-fill"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};

const formatMonth = (m) => {
  const names = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return names[m] || m;
};

const AdvisoryResult = ({ data }) => {
  const navigate = useNavigate();

  const { location, soilType, sowingMonth, advisory } = data || {};
  if (!advisory) return null;

  const {
    summary,
    avgTemp,
    avgHumidity,
    totalRain,
    topRecommendations,
    alternateOptions,
  } = advisory;

  const handleCropClick = (cropName) => {
    navigate(`/crop-advice/${cropName}`);
  };

  return (
    <div className="advisory-container">
      {/* Summary Card */}
      <div className="advisory-summary-card">
        <h3>Advisory for {location} 🌍</h3>
        <p className="summary-text">{summary}</p>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Soil</span>
            <span className="summary-value">🧪 {soilType}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Sowing Month</span>
            <span className="summary-value">
              📅 {formatMonth(sowingMonth)}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Avg Temp</span>
            <span className="summary-value">🌡 {avgTemp.toFixed(1)}°C</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Avg Humidity</span>
            <span className="summary-value">💧 {avgHumidity.toFixed(1)}%</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Rain</span>
            <span className="summary-value">🌧 {totalRain.toFixed(1)} mm</span>
          </div>
        </div>
      </div>

      {/* Top Recommendations */}
      <div className="advisory-section">
        <div className="section-header">
          <h3>Top Recommended Crops 🌾</h3>
          <span className="section-subtitle">
            Ranked by climate fit, soil, season & risk.
          </span>
        </div>

        <div className="crop-cards-grid">
          {topRecommendations.map((item, index) => (
            <div
              key={item.name}
              className="crop-card"
              onClick={() => handleCropClick(item.name)}
              style={{ cursor: "pointer" }}
            >
              <div className="crop-card-header">
                <span className="crop-rank">#{index + 1}</span>
                <h4 className="crop-name">{item.name}</h4>
              </div>

              <div className="crop-score-row">
                <span className="score-label">AI Score</span>
                <span className="score-value">{item.totalScore}/100</span>
              </div>
              <ScoreBar score={item.totalScore} max={100} />

              <div className="crop-meta-row">
                <span className="pill">
                  🕒 Season: {item.meta?.seasons?.join(", ") || "N/A"}
                </span>
                <span className="pill">
                  💦 Water: {item.meta?.waterRequirement || "N/A"}
                </span>
              </div>

              <ul className="crop-breakdown-list">
                {item.breakdown.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Alternate Options */}
      {alternateOptions && alternateOptions.length > 0 && (
        <div className="advisory-section">
          <div className="section-header">
            <h3>Alternate Crop Options 🌱</h3>
            <span className="section-subtitle">
              These are also suitable, but slightly lower ranked.
            </span>
          </div>

          <div className="alt-crops-list">
            {alternateOptions.map((item) => (
              <div
                key={item.name}
                className="alt-crop-item"
                onClick={() => handleCropClick(item.name)}
                style={{ cursor: "pointer" }}
              >
                <div>
                  <span className="alt-crop-name">{item.name}</span>
                  <span className="alt-crop-score">
                    — {item.totalScore}/100
                  </span>
                </div>
                <ScoreBar score={item.totalScore} max={100} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvisoryResult;
