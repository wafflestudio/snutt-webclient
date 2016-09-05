import 'whatwg-fetch'
import * as types from './actionTypes'
import { apiKey, baseUrl } from '../samples/sampleKey.js'

const headers = {
  'x-access-apikey': apiKey,
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
}

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
    .catch(e => dispatch({type: types.REGISTER_FAILURE, message: e}))
    .then(json => dispatch(loginLocal(_id, _pass)))
  }
}

export function loginLocal(_id, _pass) {
  let form = new FormData()
  form.append('id', _id)
  form.append('password', _pass)
  return function(dispatch) {
    fetch(baseUrl + 'auth/login_local/', {
      method: 'post',
      headers,
      body: form
    })
    .then(resp => {
      console.log(resp)
      return resp.json()
    })
    .catch(e => dispatch(failLogin(e)))
    .then(json => {
      if(json.token === undefined)
        dispatch(failLogin(json))
      dispatch(successLogin(_id, json.token))
    })
  }
}

export function logout() {
  return { type: types.LOGOUT_SUCCESS }
}

export function successLogin(id, token) {
  localStorage.setItem('id_toekn', id, token)
  return { type: types.LOGIN_SUCCESS }
}

export function failLogin(message) {
  return { type: types.LOGIN_FAILURE, message }
}
