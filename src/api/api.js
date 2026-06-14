import axios from "axios";

export const backendAPI = axios.create({
  baseURL: "http://localhost:8000/api",
});

backendAPI.interceptors.request.use((config) => {

  const token = localStorage.getItem("access_token");

//   console.log("TOKEN FOUND:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

//   console.log("HEADERS:", config.headers);

  return config;

});