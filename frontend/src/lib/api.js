import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // ✅ backend URL
  timeout: 10000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getApiErrorMessage = (
  error,
  fallbackMessage = "Something went wrong."
) => {
  if (error.response?.data?.msg) {
    return error.response.data.msg;
  }

  if (error.code === "ECONNABORTED") {
    return "The server took too long to respond.";
  }

  if (error.message === "Network Error") {
    return "Unable to connect to the backend. Make sure the API server is running.";
  }

  return fallbackMessage;
};

export default api;