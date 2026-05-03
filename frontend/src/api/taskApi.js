import axios from 'axios';
import { API_URL } from './config.js';

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
