import axios from 'axios';
import { API_URL } from './config.js';

export const signupRequest = (payload) => {
  return axios.post(`${API_URL}/auth/signup`, payload);
};

export const loginRequest = (payload) => {
  return axios.post(`${API_URL}/auth/login`, payload);
};
