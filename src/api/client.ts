import axios from 'axios';

import { apiKey, baseUrl } from '../config';
import { getToken } from 'utils/auth';
import { getErrorMessage } from 'utils/errorTable';

const client = axios.create({
  baseURL: baseUrl,
});

// Code snippet from https://github.com/github/fetch/issues/263
export const encodeParams = (params: { [key: string]: string | number }) =>
  Object.keys(params)
    .map(
      key =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(params[key]))}`,
    )
    .join('&');

export const urlEncodedFormConfig = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

client.interceptors.request.use(function(config) {
  const token = getToken();
  config.headers['x-access-apikey'] = apiKey;
  if (token) {
    config.headers['x-access-token'] = token;
  }
  return config;
});

client.interceptors.response.use(
  r => r,
  e => {
    if (e.response) {
      if (e.response.errcode && getErrorMessage(e.response.errcode)) {
        return Promise.resolve({
          ...e.response,
          message: getErrorMessage(e.response.errcode),
        });
      }
      return Promise.resolve(e.response);
    }
    return Promise.resolve(null);
  },
);

export default client;
