import axios from "axios";

export const api = axios.create({
  // En développement, utiliser le proxy Vite pour éviter les appels cross-origin.
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL + "/api/v1" : import.meta.env.VITE_API_URL,
  timeout: 60_000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
