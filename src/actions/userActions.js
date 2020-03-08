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
import { loginFail, logout as logoutAction} from 'slices/user'


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
    dispatch(loginFail({errcode: resp.error.errorCode}));
  }
};

export const loginFacebook = (fb_id, fb_token) => async dispatch => {
  const resp = await err(getTokenWithFacebookToken(fb_id, fb_token));
  if (resp.token) {
    dispatch(loginWithToken(resp.token));
  } else if (resp.error.errorCode) {
    dispatch(loginFail({errcode: resp.error.errorCode}));
  }
};

export const loginWithToken = (token, keepLogin = true) => dispatch => {
  saveToken(token, keepLogin);
  dispatch(fetchUserInfo());
  dispatch(push('/'));
};

export const logout = () => dispatch => {
  clearToken();
  dispatch(logoutAction());
  dispatch(fetchUserInfo());
  dispatch(push('/'));
  return;
};


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
  dispatch(logoutAction());
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
    changeToken(resp.token);
    dispatch(fetchUserInfo());
    callback();
  }
};
