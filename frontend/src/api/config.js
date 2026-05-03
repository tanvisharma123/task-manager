const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const cleanApiUrl = rawApiUrl
  .replace(/^VITE_API_URL=/, '')
  .replace(/\/+$/, '');

export const API_URL = cleanApiUrl.endsWith('/api') ? cleanApiUrl : `${cleanApiUrl}/api`;
