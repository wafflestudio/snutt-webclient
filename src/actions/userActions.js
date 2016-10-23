import 'whatwg-fetch'
import * as types from './actionTypes'
import { apiKey, baseUrl } from '../samples/sampleKey.js'
import { push } from 'react-router-redux'
import { fetchTableList } from './tableActions'

const headers = {
  'x-access-apikey': apiKey,
  'Content-Type': 'application/x-www-form-urlencoded',
  'x-access-token': sessionStorage.getItem('id_token'),
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
      body: encodeParams({ id: _id, password: _pass })
    })
    .then(resp => resp.json())
    .catch(e => {
      console.log("fail register")
      dispatch({type: types.REGISTER_FAILURE, message: JSON.stringify(e)})
    })
    .then(json => {
      if (json.message == "ok")
        dispatch(loginLocal(_id, _pass))
      else
        dispatch({type: types.REGISTER_FAILURE, message: json.message})
    })
  }
}

export function loginLocal(_id, _pass, keepLogin) {
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
      if (json.token === undefined)
        dispatch(failLogin(json))
      else {
        dispatch(successLogin(_id, json.token, keepLogin))
        dispatch(push('/')) //Redirect to home
      }
    })
  }
}

export function loginFacebook(fb_id, fb_token, fb_name) {
  return function(dispatch) {
    fetch(baseUrl + 'auth/login_fb/', {
      method: 'post',
      headers,
      body: encodeParams({fb_id, fb_token}),
    })
    .then(resp => {
      console.log(resp)
      return resp.json()
    })
    .catch(e => dispatch(failLogin(e)))
    .then(json => {
      if (json.token === undefined)
        dispatch(failLogin(json))
      else {
        dispatch(successLogin(fb_name, json.token))
        dispatch(push('/')) //Redirect to home
      }
    })
  }
}

export function logout() {
  return function(dispatch) {
    sessionStorage.removeItem('snutt_id')
    sessionStorage.removeItem('snutt_token')
    localStorage.removeItem('snutt_id')
    localStorage.removeItem('snutt_token')
    dispatch(push('/'))
    return dispatch({ type: types.LOGOUT_SUCCESS })
  }
}

export function successLogin(id, token, keepLogin = false) {
  return (dispatch, getState) => {
    const storage = keepLogin ? localStorage : sessionStorage
    storage.setItem('snutt_id', id)
    storage.setItem('snutt_token', token)

    const { year, semester } = getState().courseBook.get('current')
    dispatch(fetchTableList(year, semester))
    return dispatch({ type: types.LOGIN_SUCCESS, id })
  }
}

export function failLogin(error) {
  return { type: types.LOGIN_FAILURE, message: error.message }
}

export function changePassword(newPassword) {
  return function(dispatch) {
    fetch(baseUrl + 'user/password', {
      method: 'put',
      headers,
      body: encodeParams({password: newPassword})
    })
    .catch(e => console.log(e))
    .then(json => {
      if (json.token === undefined)
        dispatch(failLogin(json))
      else
        dispatch(successLogin(_id, json.token))
    })
  }
}

export function deleteAccount() {
  return function(dispatch) {
    fetch(baseUrl + 'user/account', {
      method: 'delete',
      headers,
    })
    .catch(e => console.log(e))
    .then(dispatch(push('/')))
  }
}
