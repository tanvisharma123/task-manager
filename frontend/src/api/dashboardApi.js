import axios from 'axios';
import { API_URL } from './config.js';

export const fetchDashboard = (token) => {
  return axios.get(`${API_URL}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
