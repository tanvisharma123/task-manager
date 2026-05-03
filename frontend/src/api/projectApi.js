import axios from 'axios';
import { API_URL } from './config.js';

const authConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const fetchProjects = (token) => {
  return axios.get(`${API_URL}/projects`, authConfig(token));
};

export const createProject = (payload, token) => {
  return axios.post(`${API_URL}/projects`, payload, authConfig(token));
};

export const fetchProjectDetails = (projectId, token) => {
  return axios.get(`${API_URL}/projects/${projectId}`, authConfig(token));
};

export const updateProjectMembers = (projectId, payload, token) => {
  return axios.put(`${API_URL}/projects/${projectId}/members`, payload, authConfig(token));
};
