import axios from "axios";

export const api = axios.create({
  baseURL: "https://wedev-api.sky.pro/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
