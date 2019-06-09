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
    console.debug(e);
    if (e.response) {
      console.debug(e.response);
      if (
        e.response.data &&
        e.response.data.errcode &&
        getErrorMessage(e.response.data.errcode)
      ) {
        const messageKorean = getErrorMessage(e.response.data.errcode);
        return Promise.resolve({
          ...e.response,
          data: {
            ...e.response.data,
            message: messageKorean,
          },
        });
      }
      return Promise.resolve(e.response);
    }
    return Promise.resolve(null);
  },
);

export default client;
