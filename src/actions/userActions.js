import 'whatwg-fetch'
import * as types from './actionTypes'
import { apiKey, baseUrl } from '../samples/sampleKey.js'
import { push } from 'react-router-redux'

const headers = {
  'x-access-apikey': apiKey,
  'Content-Type': 'application/x-www-form-urlencoded',
}

// Code snippet from https://github.com/github/fetch/issues/263
const encodeParams = params => Object.keys(params).map(key =>
  encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
).join('&');

export function registerUser(_id, _pass) {
  return function(dispatch) {
    fetch(baseUrl + 'auth/register_local/', {
      method: 'post',
      headers,
      body: {
        id: _id,
        pass: _pass,
      }
    })
    .then(resp => resp.json())
    .catch(e => dispatch({type: types.REGISTER_FAILURE, message: JSON.stringify(e)}))
    .then(json => dispatch(loginLocal(_id, _pass)))
  }
}

export function loginLocal(_id, _pass) {
  return function(dispatch) {
    fetch(baseUrl + 'auth/login_local/', {
      method: 'post',
      headers,
      body: encodeParams({id: _id, password: _pass}),
    })
    .then(resp => {
      return resp.json()
    })
    .catch(e => dispatch(failLogin(e)))
    .then(json => {
      if(json.token === undefined)
        dispatch(failLogin(json))
      else {
        dispatch(successLogin(_id, json.token))
        dispatch(push('/')) //Redirect to home
      }
    })
  }
}

export function logout() {
  return function(dispatch) {
    localStorage.removeItem('id_token')
    dispatch(push('/'))
    return dispatch({ type: types.LOGOUT_SUCCESS })
  }
}

export function successLogin(id, token) {
  localStorage.setItem('id_token', token)
  return { type: types.LOGIN_SUCCESS, id }
}

export function failLogin(error) {
  return { type: types.LOGIN_FAILURE, message: error.message }
}
