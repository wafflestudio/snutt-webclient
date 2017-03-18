// Mostly from https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/

import path from 'path'
import { baseUrl, apiKey } from '../samples/sampleKey'
var Symbol = require('es6-symbol')
import request from '../actions/request'

export const CALL_API = Symbol('Call API')

export default store => next => action => {
  const callAPI = action[CALL_API]

  // if callAPI is not defined, this action is not this middleware is written for
  if (typeof callAPI === 'undefined')
    return next(action)

  let { endpoint, types, config, authenticated = false, payload } = callAPI
  const [ requestType, successType, errorType ] = types

  return request(endpoint, config).then(
    response =>
      next({
        response,
        authenticated,
        payload,
        type: successType,
      }),
    error => next({
      error: error.message || 'There was an error.',
      type: errorType,
    })
  )
}
