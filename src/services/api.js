import axios from "axios";

const API = axios.create({
  baseURL: "https://taskflow-ai-backend-7fem.onrender.com/api",
});

export default API;