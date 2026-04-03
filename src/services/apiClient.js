import axios from 'axios';
import { getMockUser } from '../utils/mockAuth';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const { userId, userName, userRole } = getMockUser();

    config.headers = config.headers || {};
    config.headers['X-User-Id'] = userId;
    config.headers['X-User-Name'] = userName;
    config.headers['X-User-Role'] = userRole;

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
