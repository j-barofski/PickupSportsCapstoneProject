import axios from "axios";

const API = axios.create({
  baseURL: "https://play-pickup-capstone-project.onrender.com/api/v1"
});

export default API;
