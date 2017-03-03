import 'whatwg-fetch'
import { apiKey, baseUrl } from '../samples/sampleKey.js'
import { push } from 'react-router-redux'
import { updateCoursebook } from './fetchingActions'
import { fetchTableList } from './tableActions'
import { checkNewMessage } from './notification'

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGIN_TEMP = 'LOGIN_TEMP'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const GET_USER_INFO = 'GET_USER_INFO'


const generateHeader = () => ({
  'x-access-apikey': apiKey,
  'Content-Type': 'application/x-www-form-urlencoded',
  'x-access-token': sessionStorage.getItem('snutt_token') ||
    localStorage.getItem('snutt_token'),
})

// Code snippet from https://github.com/github/fetch/issues/263
const encodeParams = params => Object.keys(params).map(key =>
  encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
).join('&');

export function createTemporaryUser() {
  const timestamp = new Date().getTime().toString()
  const tempId = 'webTemp' + timestamp
  return function(dispatch) {
    fetch(baseUrl + 'auth/request_temp', {
      method: 'post',
      headers: generateHeader(),
    })
    .then(resp => resp.json())
    .catch(e => {
      console.log("fail register")
      dispatch({type: REGISTER_FAILURE, message: JSON.stringify(e)})
    })
    .then(json => {
      if (json.message == "ok") {
        dispatch(successLogin(tempId, json.token, true, true))
      }
      else {
        console.log("fail register")
        dispatch({type: REGISTER_FAILURE, message: JSON.stringify(e)})
      }
    })
  }
}

export function registerUser(_id, _pass) {
  return function(dispatch) {
    fetch(baseUrl + 'auth/register_local/', {
      method: 'post',
      headers: generateHeader(),
      body: encodeParams({ id: _id, password: _pass })
    })
    .then(resp => resp.json())
    .catch(e => {
      console.log("fail register")
      dispatch({type: REGISTER_FAILURE, message: JSON.stringify(e)})
    })
    .then(json => {
      if (json.message == "ok")
        dispatch(loginLocal(_id, _pass))
      else
        dispatch({type: REGISTER_FAILURE, message: json.message})
    })
  }
}

export function loginLocal(_id, _pass, keepLogin = false) {
  return function(dispatch) {
    fetch(baseUrl + 'auth/login_local/', {
      method: 'post',
      headers: generateHeader(),
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
        dispatch(successLogin(_id, json.token, keepLogin, false))
        dispatch(push('/')) //Redirect to home
      }
    })
  }
}

export function loginFacebook(fb_id, fb_token, fb_name) {
  return function(dispatch) {
    fetch(baseUrl + 'auth/login_fb/', {
      method: 'post',
      headers: generateHeader(),
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

function clearStorage() {
  sessionStorage.removeItem('snutt_id')
  sessionStorage.removeItem('snutt_token')
  localStorage.removeItem('snutt_id')
  localStorage.removeItem('snutt_token')
}

export function logout() {
  return function(dispatch) {
    clearStorage()
    dispatch(updateCoursebook())
    dispatch(push('/'))
    return dispatch({ type: LOGOUT_SUCCESS })
  }
}

export function successLogin(id, token, keepLogin = true, isTemp = false) {
  return (dispatch, getState) => {
    clearStorage()
    // debugger;
    const storage = keepLogin ? localStorage : sessionStorage
    storage.setItem('snutt_id', id)
    storage.setItem('snutt_token', token)

    const { year, semester } = getState().courseBook.get('current')
    dispatch(fetchTableList(year, semester))
    dispatch(fetchUserInfo())
    if (isTemp)
      return dispatch({ type: LOGIN_TEMP, id})
    else {
      dispatch(checkNewMessage())
      return dispatch({ type: LOGIN_SUCCESS, id })
    }
  }
}

export function failLogin(error) {
  return { type: LOGIN_FAILURE, message: error.message }
}

export function fetchUserInfo() {
  return (dispatch) => {
    fetch(baseUrl + 'user/info', {
      method: 'get',
      headers: generateHeader(),
    })
    .then(resp => resp.json())
    .then(json => dispatch({ type: GET_USER_INFO, info: json }))
    .catch(e => console.log(e))
 }
}

export function changePassword(newPassword) {
  return function(dispatch) {
    fetch(baseUrl + 'user/password', {
      method: 'put',
      headers: generateHeader(),
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
      headers: generateHeader(),
    })
    .catch(e => console.log(e))
    .then(() => {
      dispatch(push('/'))
      clearStorage()
      dispatch({ type: LOGOUT_SUCCESS })
    })
  }
}

export function attachFacebook(fb_id, fb_token) {
  return function(dispatch) {
    fetch(baseUrl + 'user/facebook', {
      method: 'post',
      headers: generateHeader(),
      body: encodeParams({fb_id, fb_token})
    })
    .then(resp => resp.json())
    .then(json => {
      if (json.errcode) {
        alert(json.message)
        return
      } else {
        const {token} = json
        changeToken(token)
        dispatch(fetchUserInfo())
      }
    })
    .catch(e => console.log(e))
  }
}

export function detachFacebook() {
  return function(dispatch) {
    fetch(baseUrl + 'user/facebook', {
      method: 'delete',
      headers: generateHeader(),
    })
    .then(resp => resp.json())
    .then(json => {
      if (json.errcode) {
        alert(json.message)
        return
      } else {
        const {token} = json
        changeToken(token)
        dispatch(fetchUserInfo())
      }
    })
    .catch(e => console.log(e))
  }
}

function changeToken(newToken) {
  const storage = Boolean(sessionStorage.getItem('snutt_token')) ?
    sessionStorage : localStorage
  storage.setItem('snutt_token', newToken)
}
