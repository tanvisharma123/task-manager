import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchDashboard = (token) => {
  return axios.get(`${API_URL}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
