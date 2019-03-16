import axios from 'axios';
import { apiKey, baseUrl } from '../config';
import { getToken } from '../utils/auth';

const client = axios.create({
  baseURL: baseUrl,
});

client.interceptors.request.use(
  function(config) {
    const token = getToken();
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
