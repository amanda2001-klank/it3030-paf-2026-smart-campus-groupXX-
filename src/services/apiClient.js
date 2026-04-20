import axios from 'axios';
import { getAuthToken, getCurrentUser } from '../utils/auth';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    const { userId, userName, userRole } = getCurrentUser();

    config.headers = config.headers || {};

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (userId) {
      config.headers['X-User-Id'] = userId;
    }

    if (userName) {
      config.headers['X-User-Name'] = userName;
    }

    if (userRole) {
      config.headers['X-User-Role'] = userRole;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
