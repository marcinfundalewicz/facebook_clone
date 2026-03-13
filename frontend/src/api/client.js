import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8080",
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API error:", error.response?.status);
    return Promise.reject(error);
  }
);

export default client;
