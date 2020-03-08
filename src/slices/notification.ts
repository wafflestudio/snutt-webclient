import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as api from 'api';
import { Notification } from 'types';
import { toggleFilterPanel } from 'slices/search';

interface GetMessagePayload {
  messages: Notification[];
}

interface CheckNewMessagePayload {
  hasNew: boolean;
}

interface NotificationState {
  fetching: boolean;
  offset: number;
  messages: Notification[];
  opened: boolean;
  hasNew: boolean;
}

const initialState: NotificationState = {
  fetching: false,
  offset: 0,
  messages: [],
  opened: false,
  hasNew: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    getMessageStart(state) {
      state.fetching = true;
    },
    getMessageOk(state, action: PayloadAction<GetMessagePayload>) {
      const messages = [...state.messages, ...action.payload.messages];
      state.fetching = false;
      state.offset = messages.length;
      state.hasNew = false;
      state.messages = messages;
    },
    checkNewMessage(state, action: PayloadAction<CheckNewMessagePayload>) {
      state.hasNew = action.payload.hasNew;
    },
    openMessageBox(state) {
      state.opened = true;
    },
    closeMessageBox(state) {
      state.opened = false;
    },
  },
  extraReducers: {
    [toggleFilterPanel.type]: state => {
      state.opened = false;
    },
  },
});

export const {
  getMessageStart,
  getMessageOk,
  checkNewMessage,
  openMessageBox,
  closeMessageBox,
} = notificationSlice.actions;

export default notificationSlice.reducer;

/**
 * Thunk actions
 */
export const fetchMessages = (limit = 10, offset) => async dispatch => {
  const response = await api.getMessages(limit, offset);
  response && dispatch(getMessageOk({ messages: response }));
};
