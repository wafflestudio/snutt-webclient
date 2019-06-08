import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { createAction } from 'typesafe-actions';
import { push } from 'react-router-redux';

import {
  TokenSuccessfulResponse,
  AuthenticationErrorResponse,
  Error,
  User,
} from 'types';
import { saveToken, clearToken, changeToken } from 'utils/auth';
import { AppState } from '../index';
import { encodeParams } from './utils';
import { fetchUserInfo } from 'store/loadingActions';
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
} from 'api';

/**
 * Action creators
 */
export const login = createAction('@user/login', action => (user: User) =>
  action({ user }),
);

export const failLogin = createAction(
  '@user/failLogin',
  action => (error: Error) => action({ error }),
);

export const logout = createAction('@user/logout', action => () => action());

export type UserActionTypes =
  | ReturnType<typeof login>
  | ReturnType<typeof failLogin>
  | ReturnType<typeof logout>;

/**
 * Thunk actions
 */
export const registerUser = (
  id: string,
  password: string,
): ThunkAction<void, AppState, null, Action> => async dispatch => {
  const resp = await createAccount(id, password);
  if (resp.message && resp.message === 'ok') {
    dispatch(loginLocal(id, password));
  }
};

export const loginLocal = (
  id: string,
  password: string,
  keepLogin: boolean = true,
): ThunkAction<void, AppState, null, Action> => async dispatch => {
  const resp = await getTokenWithIdPassword(id, password);
  if ('token' in resp) {
    dispatch(loginWithToken(resp.token));
  } else {
    dispatch(failLogin({ errorCode: resp.errcode, message: resp.message }));
  }
};

export const loginFacebook = (
  fb_id: string,
  fb_token: string,
): ThunkAction<void, AppState, null, Action> => async dispatch => {
  const resp = await getTokenWithFacebookToken(fb_id, fb_token);
  if ('token' in resp) {
    dispatch(loginWithToken(resp.token));
  } else {
    dispatch(failLogin({ message: resp.message, errorCode: resp.errcode }));
  }
};

export const loginWithToken = (
  token: string,
  keepLogin = true,
): ThunkAction<void, AppState, null, Action> => dispatch => {
  saveToken(token, keepLogin);
  dispatch(fetchUserInfo());
  dispatch(push('/'));
};

export const logoutThunk = (): ThunkAction<
  void,
  AppState,
  null,
  Action
> => dispatch => {
  clearToken();
  dispatch(logout());
  dispatch(fetchUserInfo());
  dispatch(push('/'));
  return;
};

export const leaveFeedback = async (
  email: string,
  message: string,
  callback: () => void,
) => {
  const resp = await postFeedback(email, message);
  if (resp) {
    callback();
  }
};

export const deleteAccount = (): ThunkAction<
  void,
  AppState,
  null,
  Action
> => async dispatch => {
  const resp = await removeAccount();
  if (!resp) return;

  clearToken();
  dispatch(push('/'));
  dispatch(logout());
  dispatch(fetchUserInfo());
};

export const attachFacebook = (
  fb_id: string,
  fb_token: string,
): ThunkAction<void, AppState, null, Action> => async dispatch => {
  const resp = await getNewTokenAfterLinkingFacebook(fb_id, fb_token);
  if ('token' in resp) {
    changeToken(resp.token);
    dispatch(fetchUserInfo());
  }
};

export const detachFacebook = (): ThunkAction<
  void,
  AppState,
  null,
  Action
> => async dispatch => {
  const resp = await getNewTokenAfterUnlinkingFacebook();
  if ('token' in resp) {
    changeToken(resp.token);
    dispatch(fetchUserInfo());
  }
};

export const attachLocal = (
  id: string,
  password: string,
  callback: () => void,
): ThunkAction<void, AppState, null, Action> => async dispatch => {
  const resp = await getNewTokenAfterLinkingLocalAccount(id, password);
  if ('token' in resp) {
    changeToken(resp.token);
    dispatch(fetchUserInfo());
    callback();
  }
};

export const changePassword = (
  old_password: string,
  new_password: string,
  callback: () => void,
): ThunkAction<void, AppState, null, Action> => async dispatch => {
  const resp = await getNewTokenAfterChangePassword(old_password, new_password);
  if ('token' in resp) {
    changeToken(resp.token);
    dispatch(fetchUserInfo());
    callback();
  }
};
