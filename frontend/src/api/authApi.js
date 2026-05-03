import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const signupRequest = (payload) => {
  return axios.post(`${API_URL}/auth/signup`, payload);
};

export const loginRequest = (payload) => {
  return axios.post(`${API_URL}/auth/login`, payload);
};
