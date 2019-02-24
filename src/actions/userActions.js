import 'whatwg-fetch';
import { push } from 'react-router-redux';
import { updateCoursebook } from './fetchingActions';
import { fetchTableList } from './tableActions';
import { checkNewMessage } from './notification';
import request from './request';

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

export function loginWithToken(dispatch) {
  if (localStorage.getItem('snutt_token')) {
    const isTemp = localStorage.getItem('snutt_id') === 'tempId';
    dispatch(
      successLogin(
        localStorage.getItem('snutt_id'),
        localStorage.getItem('snutt_token'),
        true,
        isTemp,
      ),
    );
  } else {
    getTemporaryToken().then(token => {
      dispatch(successLogin('tempId', token, true, true));
    });
  }
}

// Return temporary token generated by server
function getTemporaryToken() {
  return new Promise((resolve, reject) => {
    request('auth/request_temp', {
      method: 'post',
    })
      .then(json => {
        resolve(json.token);
      })
      .catch(e => {
        alert(e);
      });
  });
}

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
        if (json.message === 'ok') {
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
          dispatch(successLogin(fb_name, json.token));
          dispatch(push('/')); // Redirect to home
        }
      });
  };
}

export function clearStorage() {
  sessionStorage.removeItem('snutt_id');
  sessionStorage.removeItem('snutt_token');
  localStorage.removeItem('snutt_id');
  localStorage.removeItem('snutt_token');
}

export function logout() {
  return function(dispatch) {
    clearStorage();
    dispatch(updateCoursebook());
    dispatch(push('/'));
    return dispatch({ type: LOGOUT_SUCCESS });
  };
}

export function successLogin(id, token, keepLogin = false, isTemp = false) {
  return (dispatch, getState) => {
    clearStorage();
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

export function fetchUserInfo() {
  return dispatch => {
    request('user/info', {
      method: 'get',
    })
      .then(json => dispatch({ type: GET_USER_INFO, info: json }))
      .catch(e => console.log(e));
  };
}

export function deleteAccount() {
  return function(dispatch) {
    request('user/account', {
      method: 'delete',
    })
      .catch(e => console.log(e))
      .then(() => {
        dispatch(push('/'));
        clearStorage();
        dispatch({ type: LOGOUT_SUCCESS });
        loginWithToken(dispatch);
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

function changeToken(newToken) {
  const storage = sessionStorage.getItem('snutt_token')
    ? sessionStorage
    : localStorage;
  clearStorage();
  console.log(
    'OLD',
    sessionStorage.getItem('snutt_token'),
    localStorage.getItem('snutt_token'),
  );
  storage.setItem('snutt_token', newToken);
  console.log(
    'NEW',
    sessionStorage.getItem('snutt_token'),
    localStorage.getItem('snutt_token'),
  );
}
