import { Reducer } from 'redux';
import { getType } from 'typesafe-actions';

import { User, Error } from 'types';
import * as actions from './actions';

interface UserState {
  loggedIn: boolean;
  error: Error | null;
  user: User | null;
}

const initialState = {
  loggedIn: false,
  error: null,
  user: null,
};

export const userReducer: Reducer<UserState, actions.UserActionTypes> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case getType(actions.login): {
      const user = action.payload.user;
      const isTemp = user.local_id || user.fb_name;
      return {
        ...state,
        loggedIn: Boolean(isTemp),
        error: null,
        user: action.payload.user,
      };
    }
    case getType(actions.failLogin): {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    case getType(actions.logout): {
      return {
        ...state,
        loggedIn: false,
        user: null,
      };
    }
    default:
      return state;
  }
};
