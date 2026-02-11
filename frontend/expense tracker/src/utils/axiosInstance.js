import axios from "axios";
import { BASE_URL } from "./apipaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses safely
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // token invalid or expired
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
