import axios from "axios";

const API = axios.create({
  baseURL: "https://weather-crop-advisory-1.onrender.com/api",
});

// Add token to every request if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("farmerToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
