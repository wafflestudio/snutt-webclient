// Mostly from https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/

import path from 'path'
import { baseUrl, apiKey } from '../samples/sampleKey'


function callApi(endpoint, config, authenticated) {
  let token = sessionStorage.getItem('snutt_token') ||
    localStorage.getItem('snutt_token') || null
  if (!config.headers) config.headers = {}
  Object.assign(config.headers, { 'x-access-apikey': apiKey })

  if (authenticated) {
    if (token)
      Object.assign(config.headers, {'x-access-token': token})
    else{
      console.log(endpoint, config, authenticated)
      throw "No token saved!"
    }
  }

  return fetch(baseUrl + endpoint, config)
  .then(response =>
    response.text().then(text => ({text, response}))
  ).then(({text, response}) => {
    if (!response.ok)
      return Promise.reject(text)
    return text
  }).catch(err => console.log(err))
}


export const CALL_API = Symbol('Call API')

export default store => next => action => {
  const callAPI = action[CALL_API]

  // if callAPI is not defined, this action is not this middleware is written for
  if (typeof callAPI === 'undefined')
    return next(action)

  let { endpoint, types, config, authenticated = false } = callAPI
  const [ requestType, successType, errorType ] = types

  return callApi(endpoint, config, authenticated).then(
    response =>
      next({
        response,
        authenticated,
        type: successType,
      }),
    error => next({
      error: error.message || 'There was an error.',
      type: errorType,
    })
  )
}
