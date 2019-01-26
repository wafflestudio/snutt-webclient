import urljoin from 'url-join';

import { apiKey, baseUrl } from '../config.js';
import { logout } from './userActions';
import { store } from '../index';
import errorTable from '../utils/errorTable';

const generateHeader = () => ({
  'x-access-apikey': apiKey,
  'x-access-token':
    sessionStorage.getItem('snutt_token') ||
    localStorage.getItem('snutt_token'),
  'Content-Type': 'application/x-www-form-urlencoded',
});

const errorHandler = err => {
  // Just put to console for now
  console.log('Error from handler::', err);
  const errDetail = errorTable.find(row => err.errcode === row.code) || {
    code: -1,
    message: '알 수 없는 에러가 발생했습니다.',
  };
  alert(errDetail.message);
  if (Number(err.code) === 8194) {
    console.log('Invalid token');
    store.dispatch(logout());
  }
};

export default function request(endpoint, apiConfig) {
  const url = urljoin(baseUrl, endpoint);
  const config = Object.assign(apiConfig, {
    headers: Object.assign(generateHeader(), apiConfig.headers),
  });
  // console.log(endpoint, config);

  return new Promise((resolve, reject) => {
    fetch(url, config)
      .then(parseJSON)
      .catch(error => {
        errorHandler({
          errcode: 1,
          message: 'NetworkError',
        });
      })
      .then(response => {
        if (response.ok) {
          return resolve(response.json);
        }

        errorHandler(response.json);
        return reject(response.json.message);
      });
  });
}

function parseJSON(response) {
  return new Promise(resolve =>
    response.json().then(json =>
      resolve({
        status: response.status,
        ok: response.ok,
        json,
      }),
    ),
  );
}
