import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const authConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const fetchTasks = (token) => {
  return axios.get(`${API_URL}/tasks`, authConfig(token));
};

export const createTask = (payload, token) => {
  return axios.post(`${API_URL}/tasks`, payload, authConfig(token));
};

export const updateTask = (taskId, payload, token) => {
  return axios.put(`${API_URL}/tasks/${taskId}`, payload, authConfig(token));
};
