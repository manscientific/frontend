import React, { useEffect, useState } from "react";
import API from "../components/api";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const { data } = await API.get("/history");
        setHistory(data);
      } catch (err) {
        console.error("History fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  if (loading) return <p className="loading">Loading history...</p>;

  if (history.length === 0)
    return <p className="empty">No advisory history found.</p>;

  return (
    <div className="history-container">
      <h2>Your Advisory History 📜</h2>

      <div className="history-grid">
        {history.map((item) => (
          <div className="history-card" key={item._id}>
            <div className="history-header">
              <h3>{item.location}</h3>
              <span className="history-date">
                {new Date(item.createdAt).toLocaleString()}
              </span>
            </div>

            <p>🌱 Soil: {item.soilType}</p>
            <p>📅 Sowing Month: {item.sowingMonth}</p>

            <h4>Top Crops:</h4>
            <ul>
              {item.advisory.topRecommendations.map((crop) => (
                <li key={crop.name}>
                  {crop.name} — Score: {crop.totalScore}
                </li>
              ))}
            </ul>

            <button
              className="view-btn"
              onClick={() => alert(JSON.stringify(item.advisory, null, 2))}
            >
              View Full Advisory
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
