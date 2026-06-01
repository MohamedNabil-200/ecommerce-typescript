import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL?.trim();
if (!apiUrl) {
  throw new Error("Missing required environment variable: VITE_API_URL");
}
axios.defaults.baseURL = apiUrl.replace(/\/+$/, "");
