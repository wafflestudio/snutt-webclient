import axios from 'axios';
import { apiKey, baseUrl } from '../config';
import { getToken } from '../utils/auth';

const client = axios.create({
  baseURL: baseUrl,
});

// Code snippet from https://github.com/github/fetch/issues/263
export const encodeParams = params =>
  Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

export const urlEncodedFormConfig = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

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
