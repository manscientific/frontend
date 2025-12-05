import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API = "https://weather-crop-advisory.onrender.com";

const CropAdvicePage = () => {
  const { cropName } = useParams();

  const [form, setForm] = useState({
    fertilizer: "",
    pesticide: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    ph: "",
    organic_carbon: "",
    language: "English",
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/get-environment-friendly-advice`, {
        cropName,
        fertilizer: form.fertilizer,
        pesticide: form.pesticide,
        nitrogen: Number(form.nitrogen),
        phosphorus: Number(form.phosphorus),
        potassium: Number(form.potassium),
        ph: Number(form.ph),
        organic_carbon: Number(form.organic_carbon),
        language: form.language,
      });

      setResponse(res.data);
    } catch (err) {
      console.log("Frontend Error:", err);  // 🔥 IMPORTANT FOR DEBUGGING
      alert("Error fetching AI advice");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🌱 Soil + Input Advisory for {cropName}</h2>

      <h3>🌐 Select Language</h3>
      <select name="language" value={form.language} onChange={change}>
        <option>English</option>
        <option>Hindi</option>
        <option>Punjabi</option>
        <option>Tamil</option>
        <option>Telugu</option>
        <option>Marathi</option>
        <option>Gujarati</option>
        <option>Bengali</option>
        <option>Kannada</option>
        <option>Odia</option>
      </select>

      <h3>🧪 Soil Test Report</h3>

      <label>Nitrogen (kg/ha):</label>
      <input name="nitrogen" value={form.nitrogen} onChange={change} />

      <label>Phosphorus (kg/ha):</label>
      <input name="phosphorus" value={form.phosphorus} onChange={change} />

      <label>Potassium (kg/ha):</label>
      <input name="potassium" value={form.potassium} onChange={change} />

      <label>Soil pH:</label>
      <input name="ph" value={form.ph} onChange={change} />

      <label>Organic Carbon %:</label>
      <input name="organic_carbon" value={form.organic_carbon} onChange={change} />

      <br /><br />

      <h3>💧 Fertilizer & Pesticide Plan</h3>

      <label>Fertilizer you plan to use:</label>
      <input name="fertilizer" value={form.fertilizer} onChange={change} />

      <label>Pesticide you plan to use:</label>
      <input name="pesticide" value={form.pesticide} onChange={change} />

      <button
        onClick={submit}
        disabled={loading}
        style={{ marginTop: "20px" }}
      >
        {loading ? "Getting AI Advice..." : "Get Eco-Friendly Suggestions"}
      </button>

      {response && (
        <div style={{ marginTop: "25px", padding: "15px", border: "1px solid #aaa" }}>
          <h3>🌿 Environment-Friendly AI Suggestions</h3>

          <p><strong>Eco Fertilizer:</strong> {response.environment_friendly_fertilizer}</p>
          <p><strong>Reason:</strong> {response.fertilizer_reason}</p>

          <hr />

          <p><strong>Eco Pesticide:</strong> {response.environment_friendly_pesticide}</p>
          <p><strong>Reason:</strong> {response.pesticide_reason}</p>

          <hr />

          <p><strong>Soil Health Tip:</strong> {response.soil_health_advice}</p>
        </div>
      )}
    </div>
  );
};

export default CropAdvicePage;
