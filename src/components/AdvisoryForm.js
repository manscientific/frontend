import React, { useState } from "react";
import API from "./api";
import AdvisoryResult from "./AdvisoryResult";

const AdvisoryForm = ({ farmer }) => {
  const [location, setLocation] = useState(farmer?.location || "");
  const [soilType, setSoilType] = useState("loam");
  const [sowingMonth, setSowingMonth] = useState(""); // 1–12
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

  return (
    <div className="card">
      <h2>AI Crop Advisory 🌾</h2>
      <p className="card-subtitle">
        Get advanced recommendations based on weather, soil & season.
      </p>

      <form onSubmit={handleGetAdvisory} className="form-grid">
        <div className="form-group">
          <label>Location (optional)</label>
          <input
            type="text"
            placeholder="e.g. Delhi,IN"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <small>
            Leave blank to use your saved location:{" "}
            <b>{farmer?.location || "not set"}</b>
          </small>
        </div>

        <div className="form-group">
          <label>Soil Type</label>
          <select
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
          >
            <option value="loam">Loam</option>
            <option value="clay">Clay</option>
            <option value="sandy">Sandy</option>
          </select>
          <small>Choose the dominant soil type of your field.</small>
        </div>

        <div className="form-group">
          <label>Sowing Month (optional)</label>
          <select
            value={sowingMonth}
            onChange={(e) => setSowingMonth(e.target.value)}
          >
            <option value="">Auto (current month)</option>
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
          <small>Helps AI decide correct crop season.</small>
        </div>

        <button type="submit" disabled={loading} className="primary-btn full-width">
          {loading ? "Analyzing weather & crops..." : "Get Advisory"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {advisoryData && <AdvisoryResult data={advisoryData} />}
    </div>
  );
};

export default AdvisoryForm;
