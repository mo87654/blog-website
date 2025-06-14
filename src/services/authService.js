import axios from "axios";

const API_URL = "blog-backend-production-b03b.up.railway.app"; // Replace with your actual server

export const register = (data) => axios.post(`${API_URL}/register`, data);
export const login = (data) => axios.post(`${API_URL}/login`, data);


export const API_BASE_URL = "https://blog-backend-production-b03b.up.railway.app";
