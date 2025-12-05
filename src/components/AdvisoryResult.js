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
  FaCloud,
  FaSave,
  FaShareAlt
} from "react-icons/fa";
import { GiWheat, GiCorn, GiPlantRoots } from "react-icons/gi";
import styles from "./AdvisoryResult.module.css";

// Translation dictionaries
const translations = {
  en: {
    advisoryFor: "Crop Advisory for",
    aiGenerated: "AI Generated",
    soilType: "Soil Type",
    sowingMonth: "Sowing Month",
    avgTemperature: "Avg Temperature",
    avgHumidity: "Avg Humidity",
    totalRainfall: "Total Rainfall",
    climateScore: "Climate Score",
    topRecommendedCrops: "Top Recommended Crops",
    rankedBy: "Ranked by climate fit, soil compatibility, and seasonal suitability",
    recommendations: "Recommendations",
    aiSuitabilityScore: "AI Suitability Score",
    whyThisCrop: "Why This Crop?",
    estimatedYield: "Estimated Yield",
    alternativeCropOptions: "Alternative Crop Options",
    alsoSuitable: "These crops are also suitable but ranked slightly lower",
    season: "Season",
    sunlight: "Sunlight",
    water: "Water",
    viewDetails: "View Details",
    saveThisAdvisory: "Save This Advisory",
    shareWithFarmers: "Share with Other Farmers",
    scoreLabels: {
      excellent: "Excellent",
      good: "Good",
      average: "Average",
      poor: "Poor"
    },
    months: {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December"
    },
    seasons: {
      winter: "Winter",
      spring: "Spring",
      summer: "Summer",
      monsoon: "Monsoon",
      autumn: "Autumn",
      all: "All Season"
    },
    sunlightLevels: {
      full: "Full Sun",
      partial: "Partial Sun",
      shade: "Shade"
    },
    waterLevels: {
      low: "Low",
      moderate: "Moderate",
      high: "High"
    }
  },
  hi: {
    advisoryFor: "फसल सलाह के लिए",
    aiGenerated: "AI द्वारा उत्पन्न",
    soilType: "मिट्टी का प्रकार",
    sowingMonth: "बुवाई का महीना",
    avgTemperature: "औसत तापमान",
    avgHumidity: "औसत आर्द्रता",
    totalRainfall: "कुल वर्षा",
    climateScore: "जलवायु स्कोर",
    topRecommendedCrops: "शीर्ष अनुशंसित फसलें",
    rankedBy: "जलवायु अनुकूलता, मिट्टी संगतता और मौसमी उपयुक्तता के अनुसार रैंक किया गया",
    recommendations: "सिफारिशें",
    aiSuitabilityScore: "AI उपयुक्तता स्कोर",
    whyThisCrop: "यह फसल क्यों?",
    estimatedYield: "अनुमानित उपज",
    alternativeCropOptions: "वैकल्पिक फसल विकल्प",
    alsoSuitable: "ये फसलें भी उपयुक्त हैं लेकिन थोड़ा कम रैंक की गई हैं",
    season: "मौसम",
    sunlight: "सूरज की रोशनी",
    water: "पानी",
    viewDetails: "विवरण देखें",
    saveThisAdvisory: "इस सलाह को सहेजें",
    shareWithFarmers: "अन्य किसानों के साथ साझा करें",
    scoreLabels: {
      excellent: "उत्कृष्ट",
      good: "अच्छा",
      average: "औसत",
      poor: "खराब"
    },
    months: {
      1: "जनवरी",
      2: "फरवरी",
      3: "मार्च",
      4: "अप्रैल",
      5: "मई",
      6: "जून",
      7: "जुलाई",
      8: "अगस्त",
      9: "सितंबर",
      10: "अक्टूबर",
      11: "नवंबर",
      12: "दिसंबर"
    },
    seasons: {
      winter: "सर्दी",
      spring: "वसंत",
      summer: "गर्मी",
      monsoon: "मानसून",
      autumn: "शरद",
      all: "सभी मौसम"
    },
    sunlightLevels: {
      full: "पूर्ण सूर्य",
      partial: "आंशिक सूर्य",
      shade: "छाया"
    },
    waterLevels: {
      low: "कम",
      moderate: "मध्यम",
      high: "उच्च"
    }
  },
  kn: {
    advisoryFor: "ಬೆಳೆ ಸಲಹೆಗಾಗಿ",
    aiGenerated: "AI ರಚಿಸಿದ",
    soilType: "ಮಣ್ಣಿನ ಪ್ರಕಾರ",
    sowingMonth: "ಬಿತ್ತನೆ ತಿಂಗಳು",
    avgTemperature: "ಸರಾಸರಿ ತಾಪಮಾನ",
    avgHumidity: "ಸರಾಸರಿ ಆರ್ದ್ರತೆ",
    totalRainfall: "ಒಟ್ಟು ಮಳೆ",
    climateScore: "ಹವಾಮಾನ ಸ್ಕೋರ್",
    topRecommendedCrops: "ಅಗ್ರ ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆಗಳು",
    rankedBy: "ಹವಾಮಾನ ಹೊಂದಾಣಿಕೆ, ಮಣ್ಣಿನ ಹೊಂದಿಕೆ ಮತ್ತು ಋತುವಾರು ಸೂಕ್ತತೆಯಿಂದ ಶ್ರೇಣೀಕರಿಸಲಾಗಿದೆ",
    recommendations: "ಶಿಫಾರಸುಗಳು",
    aiSuitabilityScore: "AI ಸೂಕ್ತತೆ ಸ್ಕೋರ್",
    whyThisCrop: "ಈ ಬೆಳೆ ಏಕೆ?",
    estimatedYield: "ಅಂದಾಜು ಉತ್ಪನ್ನ",
    alternativeCropOptions: "ಪರ್ಯಾಯ ಬೆಳೆ ಆಯ್ಕೆಗಳು",
    alsoSuitable: "ಈ ಬೆಳೆಗಳು ಸಹ ಸೂಕ್ತವಾಗಿವೆ ಆದರೆ ಸ್ವಲ್ಪ ಕಡಿಮೆ ಶ್ರೇಣಿ ಪಡೆದಿವೆ",
    season: "ಋತು",
    sunlight: "ಸೂರ್ಯನ ಬೆಳಕು",
    water: "ನೀರು",
    viewDetails: "ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    saveThisAdvisory: "ಈ ಸಲಹೆಯನ್ನು ಉಳಿಸಿ",
    shareWithFarmers: "ಇತರ ರೈತರೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಿ",
    scoreLabels: {
      excellent: "ಅತ್ಯುತ್ತಮ",
      good: "ಉತ್ತಮ",
      average: "ಸರಾಸರಿ",
      poor: "ಕಳಪೆ"
    },
    months: {
      1: "ಜನವರಿ",
      2: "ಫೆಬ್ರವರಿ",
      3: "ಮಾರ್ಚ್",
      4: "ಏಪ್ರಿಲ್",
      5: "ಮೇ",
      6: "ಜೂನ್",
      7: "ಜುಲೈ",
      8: "ಆಗಸ್ಟ್",
      9: "ಸೆಪ್ಟೆಂಬರ್",
      10: "ಅಕ್ಟೋಬರ್",
      11: "ನವೆಂಬರ್",
      12: "ಡಿಸೆಂಬರ್"
    },
    seasons: {
      winter: "ಚಳಿಗಾಲ",
      spring: "ವಸಂತ",
      summer: "ಬೇಸಿಗೆ",
      monsoon: "ಮುನ್ನೀರು",
      autumn: "ಶರತ್ಕಾಲ",
      all: "ಎಲ್ಲಾ ಋತು"
    },
    sunlightLevels: {
      full: "ಪೂರ್ಣ ಸೂರ್ಯ",
      partial: "ಭಾಗಶಃ ಸೂರ್ಯ",
      shade: "ನೆರಳು"
    },
    waterLevels: {
      low: "ಕಡಿಮೆ",
      moderate: "ಮಧ್ಯಮ",
      high: "ಹೆಚ್ಚು"
    }
  }
};

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

const formatMonth = (m, language = "en") => {
  const months = translations[language]?.months;
  return months?.[m] || translations.en.months[m] || m;
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

const getSeasonLabel = (seasons, language = "en") => {
  const t = translations[language];
  if (!seasons || seasons.length === 0) return t.seasons.all;
  
  const translatedSeasons = seasons.map(season => {
    const seasonKey = season.toLowerCase();
    if (seasonKey.includes("winter")) return t.seasons.winter;
    if (seasonKey.includes("spring")) return t.seasons.spring;
    if (seasonKey.includes("summer")) return t.seasons.summer;
    if (seasonKey.includes("monsoon")) return t.seasons.monsoon;
    if (seasonKey.includes("autumn") || seasonKey.includes("fall")) return t.seasons.autumn;
    return season;
  });
  
  return translatedSeasons.join(", ");
};

const getSunlightLabel = (sunlight, language = "en") => {
  const t = translations[language];
  if (!sunlight) return t.sunlightLevels.full;
  
  const sun = sunlight.toLowerCase();
  if (sun.includes("full")) return t.sunlightLevels.full;
  if (sun.includes("partial")) return t.sunlightLevels.partial;
  if (sun.includes("shade")) return t.sunlightLevels.shade;
  return sunlight;
};

const getWaterLabel = (water, language = "en") => {
  const t = translations[language];
  if (!water) return t.waterLevels.moderate;
  
  const waterLevel = water.toLowerCase();
  if (waterLevel.includes("low")) return t.waterLevels.low;
  if (waterLevel.includes("moderate") || waterLevel.includes("medium")) return t.waterLevels.moderate;
  if (waterLevel.includes("high")) return t.waterLevels.high;
  return water;
};

const getScoreColor = (score) => {
  if (score >= 80) return styles.scoreExcellent;
  if (score >= 60) return styles.scoreGood;
  if (score >= 40) return styles.scoreAverage;
  return styles.scorePoor;
};

const getScoreLabel = (score, language = "en") => {
  const t = translations[language];
  if (score >= 80) return t.scoreLabels.excellent;
  if (score >= 60) return t.scoreLabels.good;
  if (score >= 40) return t.scoreLabels.average;
  return t.scoreLabels.poor;
};

const AdvisoryResult = ({ data, language = "en" }) => {
  const navigate = useNavigate();
  const t = translations[language];

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
    <div className={styles.container}>
      {/* Summary Section */}
      <div className={styles.summarySection}>
        <div className={styles.summaryHeader}>
          <div className={styles.locationHeader}>
            <FaGlobe className={styles.headerIcon} />
            <h2 className={styles.locationTitle}>{t.advisoryFor} {location}</h2>
          </div>
          <div className={styles.aiTag}>
            <span>🌱 {t.aiGenerated}</span>
          </div>
        </div>

        <p className={styles.summaryText}>{summary}</p>

        <div className={styles.conditionsGrid}>
          <div className={styles.conditionCard}>
            <div className={styles.conditionIcon}>
              <FaFlask />
            </div>
            <div>
              <div className={styles.conditionLabel}>{t.soilType}</div>
              <div className={styles.conditionValue}>{soilType}</div>
            </div>
          </div>

          <div className={styles.conditionCard}>
            <div className={styles.conditionIcon}>
              <FaCalendarAlt />
            </div>
            <div>
              <div className={styles.conditionLabel}>{t.sowingMonth}</div>
              <div className={styles.conditionValue}>{formatMonth(sowingMonth, language)}</div>
            </div>
          </div>

          <div className={styles.conditionCard}>
            <div className={styles.conditionIcon}>
              <FaThermometerHalf />
            </div>
            <div>
              <div className={styles.conditionLabel}>{t.avgTemperature}</div>
              <div className={styles.conditionValue}>{avgTemp.toFixed(1)}°C</div>
            </div>
          </div>

          <div className={styles.conditionCard}>
            <div className={styles.conditionIcon}>
              <FaTint />
            </div>
            <div>
              <div className={styles.conditionLabel}>{t.avgHumidity}</div>
              <div className={styles.conditionValue}>{avgHumidity.toFixed(1)}%</div>
            </div>
          </div>

          <div className={styles.conditionCard}>
            <div className={styles.conditionIcon}>
              <FaCloudRain />
            </div>
            <div>
              <div className={styles.conditionLabel}>{t.totalRainfall}</div>
              <div className={styles.conditionValue}>{totalRain.toFixed(1)} mm</div>
            </div>
          </div>

          <div className={styles.conditionCard}>
            <div className={styles.conditionIcon}>
              <FaWind />
            </div>
            <div>
              <div className={styles.conditionLabel}>{t.climateScore}</div>
              <div className={`${styles.conditionValue} ${getScoreColor(
                topRecommendations[0]?.totalScore || 0
              )}`}>
                {Math.round(topRecommendations[0]?.totalScore || 0)}/100
                <span className={styles.scoreLabelSmall}>
                  ({getScoreLabel(topRecommendations[0]?.totalScore || 0, language)})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Recommendations */}
      <div className={styles.recommendationsSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h3 className={styles.sectionTitle}>{t.topRecommendedCrops}</h3>
            <p className={styles.sectionSubtitle}>
              {t.rankedBy}
            </p>
          </div>
          <div className={styles.recommendationCount}>
            <FaSeedling />
            <span>{topRecommendations.length} {t.recommendations}</span>
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
                  <span className={styles.scoreLabel}>{t.aiSuitabilityScore}</span>
                  <span className={`${styles.scoreValue} ${getScoreColor(item.totalScore)}`}>
                    {item.totalScore}/100
                    <span className={styles.scoreQuality}>
                      ({getScoreLabel(item.totalScore, language)})
                    </span>
                  </span>
                </div>
                <ScoreBar score={item.totalScore} />
              </div>

              <div className={styles.cropMeta}>
                <div className={styles.metaPill}>
                  <FaCalendarAlt className={styles.pillIcon} />
                  <span>{getSeasonLabel(item.meta?.seasons, language)}</span>
                </div>
                <div className={styles.metaPill}>
                  <FaWater className={styles.pillIcon} />
                  <span>{getWaterLabel(item.meta?.waterRequirement, language)}</span>
                </div>
                <div className={styles.metaPill}>
                  <FaSun className={styles.pillIcon} />
                  <span>{getSunlightLabel(item.meta?.sunlight, language)}</span>
                </div>
              </div>

              <div className={styles.breakdownSection}>
                <h5 className={styles.breakdownTitle}>{t.whyThisCrop}</h5>
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
                  {t.estimatedYield}:{" "}
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
              <h3 className={styles.sectionTitle}>{t.alternativeCropOptions}</h3>
              <p className={styles.sectionSubtitle}>
                {t.alsoSuitable}
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
                        {getSeasonLabel(item.meta?.seasons, language)}
                      </span>
                      <span className={styles.separator}>•</span>
                      <span className={styles.alternateWater}>
                        {getWaterLabel(item.meta?.waterRequirement, language)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.alternateScore}>
                  <div className={styles.scoreInfo}>
                    <span className={styles.scoreLabel}>{t.aiSuitabilityScore}</span>
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
                  <span>{t.viewDetails}</span>
                  <FaChevronRight className={styles.viewMoreIcon} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {/* 
<div className={styles.actionSection}>
  <button className={styles.primaryAction}>
    <FaSave />
    <span>{t.saveThisAdvisory}</span>
  </button>
  <button className={styles.secondaryAction}>
    <FaShareAlt />
    <span>{t.shareWithFarmers}</span>
  </button>
</div>
*/}

    </div>
  );
};

export default AdvisoryResult;