import 'whatwg-fetch';
import { push } from 'react-router-redux';

import { fetchUserInfo } from 'actions/loadingActions';
import err from 'utils/errorHandler';

import {
  createAccount,
  getTokenWithIdPassword,
  getTokenWithFacebookToken,
  postFeedback,
  removeAccount,
  getNewTokenAfterLinkingFacebook,
  getNewTokenAfterUnlinkingFacebook,
  getNewTokenAfterLinkingLocalAccount,
  getNewTokenAfterChangePassword,
} from '../api';
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

export const registerUser = (id, password) => async dispatch => {
  const resp = await err(createAccount(id, password));
  if (resp.message && resp.message === 'ok') {
    dispatch(loginLocal(id, password));
  }
};

export const loginLocal = (
  id,
  password,
  keepLogin = true,
) => async dispatch => {
  const resp = await err(getTokenWithIdPassword(id, password), false);
  if (resp.token) {
    dispatch(loginWithToken(resp.token, keepLogin));
  } else if (resp.error.errorCode) {
    dispatch(failLogin(resp.error.errorCode));
  }
};

export const loginFacebook = (fb_id, fb_token) => async dispatch => {
  const resp = await err(getTokenWithFacebookToken(fb_id, fb_token));
  if (resp.token) {
    dispatch(loginWithToken(resp.token));
  } else if (resp.error.errorCode) {
    dispatch(failLogin(resp.error.errorCode));
  }
};

export const loginWithToken = (token, keepLogin = true) => dispatch => {
  saveToken(token, keepLogin);
  dispatch(fetchUserInfo());
  dispatch(push('/'));
};

export const logout = () => dispatch => {
  clearToken();
  dispatch({ type: LOGOUT_SUCCESS });
  dispatch(fetchUserInfo());
  dispatch(push('/'));
  return;
};

export const failLogin = errcode => ({ type: LOGIN_FAILURE, errcode });

export const leaveFeedback = async (email, message, callback) => {
  const resp = await err(postFeedback(email, message));
  if (!resp.error) {
    callback();
  }
};

export const deleteAccount = () => async dispatch => {
  const resp = await err(removeAccount());
  if (resp.error) return;

  clearToken();
  dispatch(push('/'));
  dispatch({ type: LOGOUT_SUCCESS });
  dispatch(fetchUserInfo());
};

export const attachFacebook = (fb_id, fb_token) => async dispatch => {
  const resp = await err(getNewTokenAfterLinkingFacebook(fb_id, fb_token));
  if (resp.token) {
    changeToken(resp.token);
    dispatch(fetchUserInfo());
  }
};

export const detachFacebook = () => async dispatch => {
  const resp = await err(getNewTokenAfterUnlinkingFacebook());
  if (resp.token) {
    changeToken(resp.token);
    dispatch(fetchUserInfo());
  }
};

export const attachLocal = (id, password, callback) => async dispatch => {
  const resp = await err(getNewTokenAfterLinkingLocalAccount(id, password));
  if (resp.token) {
    changeToken(resp.token);
    dispatch(fetchUserInfo());
    callback();
  }
};

export const changePassword = (
  old_password,
  new_password,
  callback,
) => async dispatch => {
  const resp = await err(
    getNewTokenAfterChangePassword(old_password, new_password),
  );
  if (resp.token) {
    changeToken(resp);
    dispatch(fetchUserInfo());
    callback();
  }
};
