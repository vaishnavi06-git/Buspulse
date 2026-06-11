import axios from "axios";

const api = axios.create({
  baseURL: "https://buspulse-backend.onrender.com/api",
});

export default api;