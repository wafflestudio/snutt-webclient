import axios from 'axios';
import { apiKey, baseUrl } from '../config';

const client = axios.create({
  baseURL: baseUrl,
});

client.interceptors.request.use(
  function(config) {
    const token =
      sessionStorage.getItem('snutt_token') ||
      localStorage.getItem('snutt_token');
    config.headers['x-access-apikey'] = apiKey;
    if (token) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

export default client;
