import React, { useState } from "react";
import axios from "axios";

const API = "https://weather-crop-advisory.onrender.com";

const LeafDiseasePage = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const upload = async () => {
    const form = new FormData();
    form.append("file", file);

    const res = await axios.post(`${API}/detect-leaf-disease`, form, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    setResult(res.data);

  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Leaf Disease Detector 🌿</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button onClick={upload}>Analyze Leaf</button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <p><b>Disease:</b> {result.disease_name}</p>
          <p><b>Severity:</b> {result.severity}</p>
          <p><b>Cause:</b> {result.cause}</p>
          <p><b>Treatment:</b> {result.recommended_treatment}</p>
          <p><b>Eco Solution:</b> {result.eco_friendly_solution}</p>
        </div>
      )}
    </div>
  );
};

export default LeafDiseasePage;
