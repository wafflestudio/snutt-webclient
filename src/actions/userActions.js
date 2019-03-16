import 'whatwg-fetch';
import { push } from 'react-router-redux';
import { fetchUserInfo } from './loadingActions';

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
  const resp = await createAccount(id, password);
  if (resp.message && resp.message === 'ok') {
    dispatch(loginLocal(id, password));
  } else {
    dispatch({ type: REGISTER_FAILURE, message: resp.message });
  }
};

export const loginLocal = (
  id,
  password,
  keepLogin = true,
) => async dispatch => {
  try {
    const token = await getTokenWithIdPassword(id, password);
    dispatch(loginWithToken(token, keepLogin));
  } catch (e) {
    dispatch(failLogin(e));
  }
};

export const loginFacebook = (fb_id, fb_token) => async dispatch => {
  try {
    const token = await getTokenWithFacebookToken(fb_id, fb_token);
    dispatch(loginWithToken(token));
  } catch (e) {
    dispatch(failLogin(e));
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

export function failLogin(error) {
  return { type: LOGIN_FAILURE, message: error.message };
}

export const leaveFeedback = async (email, message, callback) => {
  const resp = await postFeedback(email, message);
  if (resp.errocde) {
    alert(resp.message);
  } else {
    callback();
  }
};

export const deleteAccount = () => async dispatch => {
  await removeAccount();
  clearToken();
  dispatch({ type: LOGOUT_SUCCESS });
  dispatch(fetchUserInfo());
  dispatch(push('/'));
};

export const attachFacebook = (fb_id, fb_token) => async dispatch => {
  try {
    const token = await getNewTokenAfterLinkingFacebook(fb_id, fb_token);
    changeToken(token);
    dispatch(fetchUserInfo());
  } catch (e) {
    console.log(e);
  }
};

export const detachFacebook = () => async dispatch => {
  try {
    const token = await getNewTokenAfterUnlinkingFacebook();
    changeToken(token);
    dispatch(fetchUserInfo());
  } catch (e) {
    console.log(e);
  }
};

export const attachLocal = (id, password, callback) => async dispatch => {
  try {
    const token = await getNewTokenAfterLinkingLocalAccount(id, password);
    changeToken(token);
    dispatch(fetchUserInfo());
    callback();
  } catch (e) {
    console.log(e);
  }
};

export const changePassword = (
  old_password,
  new_password,
  callback,
) => async dispatch => {
  try {
    const token = await getNewTokenAfterChangePassword(
      old_password,
      new_password,
    );
    changeToken(token);
    dispatch(fetchUserInfo());
    callback();
  } catch (e) {
    console.log(e);
  }
};
