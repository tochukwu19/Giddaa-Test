import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://dev-api.giddaa.com";

export const publicApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);