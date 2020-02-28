import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types';
import { getErrorMessage } from '../utils/errorTable';

interface UserState {
  loggedIn: boolean;
  id: string;
  errorType: string;
  message: string;
  info: User | null;
}

interface LoginSuccessPayload {
  info: User;
}

interface LoginFailPaylod {
  errcode: number;
}

interface RegisterFailPaylod {
  message: string;
  type: string;
}

const initialState: UserState = {
  loggedIn: false,
  id: '',
  errorType: '',
  message: '',
  info: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<LoginSuccessPayload>) {
      state.info = action.payload?.info;
      state.errorType = '';
      state.message = '';
      const username =
        action.payload?.info?.local_id || action.payload?.info?.fb_name;
      if (username) {
        state.id = username;
        state.loggedIn = true;
      } else {
        state.id = 'tempId';
        state.loggedIn = false;
      }
    },
    loginFail(state, action: PayloadAction<LoginFailPaylod>) {
      state.loggedIn = false;
      state.errorType = 'login';
      state.message = getErrorMessage(action.payload.errcode);
    },
    logout(state) {
      state = {
        ...initialState,
      };
    },
    registerFail(state, action: PayloadAction<RegisterFailPaylod>) {
      state.loggedIn = false;
      state.errorType = 'register';
      state.message = action.payload.message;
    },
  },
});

export const {
  loginSuccess,
  loginFail,
  logout,
  registerFail,
} = userSlice.actions;

export default userSlice.reducer;
