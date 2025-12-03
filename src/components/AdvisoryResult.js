import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaGlobe, 
  FaFlask, 
  FaCalendarAlt, 
  FaThermometerHalf, 
  FaTint, 
  FaCloudRain,
  FaSeedling,
  FaLeaf,
  FaTree,
  FaTractor,
  FaChevronRight,
  FaFire,
  FaWater,
  FaWind,
  FaSun,
  FaCloud
} from "react-icons/fa";
import { GiWheat, GiCorn, GiPlantRoots } from "react-icons/gi";
import styles from "./AdvisoryResult.module.css";

const ScoreBar = ({ score, max = 100 }) => {
  const percent = Math.min(100, Math.max(0, (score / max) * 100));
  return (
    <div className={styles.scoreBar}>
      <div
        className={styles.scoreBarFill}
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

const getCropIcon = (cropName) => {
  const name = cropName.toLowerCase();
  if (name.includes("wheat")) return <GiWheat />;
  if (name.includes("rice")) return <FaLeaf />;
  if (name.includes("corn") || name.includes("maize")) return <GiCorn />;
  if (name.includes("potato") || name.includes("vegetable")) return <GiPlantRoots />;
  if (name.includes("cotton")) return <FaTree />;
  return <FaSeedling />;
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

  const getScoreColor = (score) => {
    if (score >= 80) return styles.scoreExcellent;
    if (score >= 60) return styles.scoreGood;
    if (score >= 40) return styles.scoreAverage;
    return styles.scorePoor;
  };

  return (
    <div className={styles.container}>
      {/* Summary Section */}
      <div className={styles.summarySection}>
        <div className={styles.summaryHeader}>
          <div className={styles.locationHeader}>
            <FaGlobe className={styles.headerIcon} />
            <h2 className={styles.locationTitle}>Crop Advisory for {location}</h2>
          </div>
          <div className={styles.aiTag}>
            <span>🌱 AI Generated</span>
          </div>
        </div>

        <p className={styles.summaryText}>{summary}</p>

        <div className={styles.conditionsGrid}>
          <div className={styles.conditionCard}>
            <div className={styles.conditionIcon}>
              <FaFlask />
            </div>
            <div>
              <div className={styles.conditionLabel}>Soil Type</div>
              <div className={styles.conditionValue}>{soilType}</div>
            </div>
          </div>

          <div className={styles.conditionCard}>
            <div className={styles.conditionIcon}>
              <FaCalendarAlt />
            </div>
            <div>
              <div className={styles.conditionLabel}>Sowing Month</div>
              <div className={styles.conditionValue}>{formatMonth(sowingMonth)}</div>
            </div>
          </div>

          <div className={styles.conditionCard}>
            <div className={styles.conditionIcon}>
              <FaThermometerHalf />
            </div>
            <div>
              <div className={styles.conditionLabel}>Avg Temperature</div>
              <div className={styles.conditionValue}>{avgTemp.toFixed(1)}°C</div>
            </div>
          </div>

          <div className={styles.conditionCard}>
            <div className={styles.conditionIcon}>
              <FaTint />
            </div>
            <div>
              <div className={styles.conditionLabel}>Avg Humidity</div>
              <div className={styles.conditionValue}>{avgHumidity.toFixed(1)}%</div>
            </div>
          </div>

          <div className={styles.conditionCard}>
            <div className={styles.conditionIcon}>
              <FaCloudRain />
            </div>
            <div>
              <div className={styles.conditionLabel}>Total Rainfall</div>
              <div className={styles.conditionValue}>{totalRain.toFixed(1)} mm</div>
            </div>
          </div>

          <div className={styles.conditionCard}>
            <div className={styles.conditionIcon}>
              <FaWind />
            </div>
            <div>
              <div className={styles.conditionLabel}>Climate Score</div>
              <div className={`${styles.conditionValue} ${getScoreColor(
                topRecommendations[0]?.totalScore || 0
              )}`}>
                {Math.round(topRecommendations[0]?.totalScore || 0)}/100
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Recommendations */}
      <div className={styles.recommendationsSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h3 className={styles.sectionTitle}>Top Recommended Crops</h3>
            <p className={styles.sectionSubtitle}>
              Ranked by climate fit, soil compatibility, and seasonal suitability
            </p>
          </div>
          <div className={styles.recommendationCount}>
            <FaSeedling />
            <span>{topRecommendations.length} Recommendations</span>
          </div>
        </div>

        <div className={styles.cropCardsGrid}>
          {topRecommendations.map((item, index) => (
            <div
              key={item.name}
              className={styles.cropCard}
              onClick={() => handleCropClick(item.name)}
            >
              <div className={styles.cardHeader}>
                <div className={styles.rankBadge}>
                  <span>#{index + 1}</span>
                </div>
                <div className={styles.cropHeader}>
                  <div className={styles.cropIcon}>
                    {getCropIcon(item.name)}
                  </div>
                  <h4 className={styles.cropName}>{item.name}</h4>
                </div>
                <button className={styles.viewDetailsBtn}>
                  <FaChevronRight />
                </button>
              </div>

              <div className={styles.scoreSection}>
                <div className={styles.scoreHeader}>
                  <span className={styles.scoreLabel}>AI Suitability Score</span>
                  <span className={`${styles.scoreValue} ${getScoreColor(item.totalScore)}`}>
                    {item.totalScore}/100
                  </span>
                </div>
                <ScoreBar score={item.totalScore} />
              </div>

              <div className={styles.cropMeta}>
                <div className={styles.metaPill}>
                  <FaCalendarAlt className={styles.pillIcon} />
                  <span>{item.meta?.seasons?.join(", ") || "All Season"}</span>
                </div>
                <div className={styles.metaPill}>
                  <FaWater className={styles.pillIcon} />
                  <span>{item.meta?.waterRequirement || "Moderate"}</span>
                </div>
                <div className={styles.metaPill}>
                  <FaSun className={styles.pillIcon} />
                  <span>{item.meta?.sunlight || "Full Sun"}</span>
                </div>
              </div>

              <div className={styles.breakdownSection}>
                <h5 className={styles.breakdownTitle}>Why This Crop?</h5>
                <ul className={styles.breakdownList}>
                  {item.breakdown.map((line, i) => (
                    <li key={i} className={styles.breakdownItem}>
                      <div className={styles.bullet}></div>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.yieldEstimate}>
                <FaTractor className={styles.yieldIcon} />
                <span className={styles.yieldText}>
                  Estimated Yield:{" "}
                  <strong>{item.meta?.estimatedYield || "8-12 tons/ha"}</strong>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alternate Options */}
      {alternateOptions && alternateOptions.length > 0 && (
        <div className={styles.alternateSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h3 className={styles.sectionTitle}>Alternative Crop Options</h3>
              <p className={styles.sectionSubtitle}>
                These crops are also suitable but ranked slightly lower
              </p>
            </div>
          </div>

          <div className={styles.alternateGrid}>
            {alternateOptions.map((item) => (
              <div
                key={item.name}
                className={styles.alternateCard}
                onClick={() => handleCropClick(item.name)}
              >
                <div className={styles.alternateHeader}>
                  <div className={styles.alternateIcon}>
                    {getCropIcon(item.name)}
                  </div>
                  <div className={styles.alternateInfo}>
                    <h4 className={styles.alternateName}>{item.name}</h4>
                    <div className={styles.alternateMeta}>
                      <span className={styles.alternateSeason}>
                        {item.meta?.seasons?.[0] || "Seasonal"}
                      </span>
                      <span className={styles.separator}>•</span>
                      <span className={styles.alternateWater}>
                        {item.meta?.waterRequirement || "Moderate"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.alternateScore}>
                  <div className={styles.scoreInfo}>
                    <span className={styles.scoreLabel}>Score</span>
                    <span className={`${styles.scoreValue} ${getScoreColor(item.totalScore)}`}>
                      {item.totalScore}/100
                    </span>
                  </div>
                  <ScoreBar score={item.totalScore} />
                </div>

                <div className={styles.alternateBreakdown}>
                  {item.breakdown.slice(0, 1).map((line, i) => (
                    <p key={i} className={styles.breakdownText}>{line}</p>
                  ))}
                </div>

                <div className={styles.viewMore}>
                  <span>View Details</span>
                  <FaChevronRight className={styles.viewMoreIcon} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className={styles.actionSection}>
        <button className={styles.primaryAction}>
          <FaSeedling />
          <span>Save This Advisory</span>
        </button>
        <button className={styles.secondaryAction}>
          <FaFire />
          <span>Share with Other Farmers</span>
        </button>
      </div>
    </div>
  );
};

export default AdvisoryResult;