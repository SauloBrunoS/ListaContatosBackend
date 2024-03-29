import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8090/api',
  timeout: 10000,
});

export default apiClient;
