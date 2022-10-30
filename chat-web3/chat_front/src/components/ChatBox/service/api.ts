import axios from "axios";

const api = axios.create({
  baseURL: "https://avatars.dicebear.com/api",
});

export default api;