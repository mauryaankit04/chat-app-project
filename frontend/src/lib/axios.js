import axios from "axios";

export const axiosInstance = axios.create({
  // In dev, Vite proxy forwards /api → localhost:5001
  // In production, /api is handled by Vercel rewrites → serverless backend
  baseURL: "/api",
  withCredentials: true,
});
