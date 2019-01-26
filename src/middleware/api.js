// Mostly from https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/

import path from 'path';
import request from '../actions/request';

import { baseUrl, apiKey } from '../config';

const Symbol = require('es6-symbol');

export const CALL_API = Symbol('Call API');

export default store => next => action => {
  const callAPI = action[CALL_API];

  // if callAPI is not defined, this action is not this middleware is written for
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { endpoint, types, config, authenticated = false, payload } = callAPI;
  const [requestType, successType, errorType] = types;

  if (requestType) {
    next({
      authenticated,
      payload,
      type: requestType,
    });
  }

  return request(endpoint, config).then(
    response =>
      next({
        response,
        authenticated,
        payload,
        type: successType,
      }),
    error =>
      next({
        error: error.message || 'There was an error.',
        type: errorType,
      }),
  );
};
