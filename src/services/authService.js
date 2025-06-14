import axios from "axios";

const API_URL = "http://localhost:3000"; // Replace with your actual server

export const register = (data) => axios.post(`${API_URL}/register`, data);
export const login = (data) => axios.post(`${API_URL}/login`, data);
