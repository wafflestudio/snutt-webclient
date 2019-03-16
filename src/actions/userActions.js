import 'whatwg-fetch';
import { push } from 'react-router-redux';
import { fetchUserInfo } from './loadingActions';
import { fetchTableList } from './tableActions';
import { checkNewMessage } from './notification';
import request from './request';
import { getTemporaryToken } from '../api';
import { saveToken, clearToken, changeToken } from '../utils/auth';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_TEMP = 'LOGIN_TEMP';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const GET_USER_INFO = 'GET_USER_INFO';

// Code snippet from https://github.com/github/fetch/issues/263
export const encodeParams = params =>
  Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

export function registerUser(_id, _pass) {
  return function(dispatch) {
    request('auth/register_local', {
      method: 'post',
      body: encodeParams({ id: _id, password: _pass }),
    })
      .catch(e => {
        console.log('fail register');
        dispatch({ type: REGISTER_FAILURE, message: JSON.stringify(e) });
      })
      .then(json => {
        if (json.message && json.message === 'ok') {
          dispatch(loginLocal(_id, _pass));
        } else {
          dispatch({ type: REGISTER_FAILURE, message: json.message });
        }
      });
  };
}
export function loginLocal(_id, _pass, keepLogin = false) {
  return function(dispatch) {
    request('auth/login_local', {
      method: 'post',
      body: encodeParams({ id: _id, password: _pass }),
    })
      .catch(e => dispatch(failLogin(e)))
      .then(json => {
        if (json.token === undefined) {
          dispatch(failLogin(json));
        } else {
          dispatch(successLogin(_id, json.token, keepLogin, false));
          dispatch(push('/')); // Redirect to home
        }
      });
  };
}

export function loginFacebook(fb_id, fb_token, fb_name) {
  return function(dispatch) {
    request('auth/login_fb', {
      method: 'post',
      body: encodeParams({ fb_id, fb_token }),
    })
      .catch(e => dispatch(failLogin(e)))
      .then(json => {
        if (json.token === undefined) {
          dispatch(failLogin(json));
        } else {
          dispatch(fetchUserInfo());
          dispatch(push('/')); // Redirect to home
        }
      });
  };
}

export function logout() {
  return async function(dispatch) {
    // dispatch(updateCoursebook());
    const tempToken = await getTemporaryToken();
    saveToken(tempToken);

    dispatch({ type: LOGOUT_SUCCESS });
    dispatch(fetchUserInfo());
    dispatch(push('/'));
    return;
  };
}

export function successLogin(id, token, keepLogin = false, isTemp = false) {
  return (dispatch, getState) => {
    clearToken();
    const storage = keepLogin ? localStorage : sessionStorage;
    storage.setItem('snutt_id', id);
    storage.setItem('snutt_token', token);

    const { year, semester } = getState().courseBook.get('current');
    dispatch(fetchTableList(year, semester));
    dispatch(fetchUserInfo());
    if (isTemp) {
      return dispatch({ type: LOGIN_TEMP, id });
    }

    dispatch(checkNewMessage());
    return dispatch({ type: LOGIN_SUCCESS, id });
  };
}

export function failLogin(error) {
  return { type: LOGIN_FAILURE, message: error.message };
}

export function leaveFeedback(email, message, okCallback) {
  request('feedback/', {
    method: 'post',
    body: encodeParams({ email, message }),
  })
    .then(json => {
      if (json.errcode) {
        alert(json.message);
      } else {
        okCallback();
      }
    })
    .catch(e => alert(e));
}

export function deleteAccount() {
  return function(dispatch) {
    request('user/account', {
      method: 'delete',
    })
      .catch(e => console.log(e))
      .then(() => {
        dispatch(push('/'));
        clearToken();
        dispatch({ type: LOGOUT_SUCCESS });
        dispatch(fetchUserInfo());
      });
  };
}

export function attachFacebook(fb_id, fb_token) {
  return function(dispatch) {
    request('user/facebook', {
      method: 'post',
      body: encodeParams({ fb_id, fb_token }),
    })
      .then(json => {
        if (json.errcode) {
          alert(json.message);
        } else {
          const { token } = json;
          changeToken(token);
          dispatch(fetchUserInfo());
        }
      })
      .catch(e => console.log(e));
  };
}

export function detachFacebook() {
  return function(dispatch) {
    request('user/facebook', {
      method: 'delete',
    })
      .then(json => {
        if (json.errcode) {
          alert(json.message);
        } else {
          const { token } = json;
          changeToken(token);
          dispatch(fetchUserInfo());
        }
      })
      .catch(e => console.log(e));
  };
}

export function attachLocal(id, password, okCallback) {
  return function(dispatch) {
    request('user/password', {
      method: 'post',
      body: encodeParams({ id, password }),
    })
      .then(json => {
        if (json.errcode) {
          alert(json.message);
        } else {
          const { token } = json;
          changeToken(token);
          dispatch(fetchUserInfo());
          okCallback();
        }
      })
      .catch(e => alert(e));
  };
}

export function changePassword(old_password, new_password, okCallback) {
  return function(dispatch) {
    request('user/password', {
      method: 'put',
      body: encodeParams({ old_password, new_password }),
    })
      .then(json => {
        if (json.errcode) {
          alert(json.message);
        } else {
          const { token } = json;
          changeToken(token);
          okCallback();
        }
      })
      .catch(e => alert(e));
  };
}
