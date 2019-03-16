import {
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_TEMP,
  LOGOUT_SUCCESS,
  GET_USER_INFO,
} from '../actions/userActions';
import { LOGIN_OK } from '../actions/actionTypes';

const INITIAL_STATE = {
  loggedIn: false,
  id: '',
  errorType: null,
  message: '',
  info: {},
};

const handlers = {
  [LOGIN_OK]: (state, action) => {
    const { userInfo } = action;
    if (userInfo.local_id) {
      //임시 로그인 아님
      return {
        ...INITIAL_STATE,
        loggedIn: true,
        id: userInfo.local_id,
        info: userInfo,
      };
    }
    return { ...INITIAL_STATE, loggedIn: false, id: 'tempId', info: userInfo };
  },

  [LOGIN_SUCCESS]: (state, action) =>
    Object.assign({}, INITIAL_STATE, { loggedIn: true, id: action.id }),

  [LOGIN_FAILURE]: (state, action) => ({
    loggedIn: false,
    errorType: 'login',
    message: action.message,
  }),

  [LOGOUT_SUCCESS]: (state, action) => INITIAL_STATE,

  [LOGIN_TEMP]: (state, action) =>
    Object.assign({}, INITIAL_STATE, { id: action.id }),

  [REGISTER_FAILURE]: (state, action) => ({
    loggedIn: false,
    errorType: 'register',
    message: action.message,
    type: action.type,
  }),

  [GET_USER_INFO]: (state, action) => ({
    info: action.info,
  }),
};

export default function userReducer(state = INITIAL_STATE, action) {
  const handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
