import { Notification } from 'types';
import {
  OPEN_MESSAGE_BOX,
  CLOSE_MESSAGE_BOX,
  GET_MESSAGE_OK,
  CHECK_NEW_MESSAGE_OK,
  NotficationActionTypes,
} from './types';
// import err from 'utils/errorHandler';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import { AppState } from '../index';
import * as api from 'api';

export const openMessageBox = (): NotficationActionTypes => ({
  type: OPEN_MESSAGE_BOX,
});

export const closeMessageBox = (): NotficationActionTypes => ({
  type: CLOSE_MESSAGE_BOX,
});

export const getMessages = (
  messages: Notification[],
): NotficationActionTypes => ({
  type: GET_MESSAGE_OK,
  messages: messages,
});

export const checkNewMessages = (count: number): NotficationActionTypes => ({
  type: CHECK_NEW_MESSAGE_OK,
  count,
});

export const getMessagesThunk = (
  limit: number = 10,
  offset: number = 0,
): ThunkAction<void, AppState, null, Action> => async dispatch => {
  const response = await api.getMessages(limit, offset);
  dispatch(getMessages(response));
};

export const checkNewMessagesThunk = (): ThunkAction<
  void,
  AppState,
  null,
  Action
> => async dispatch => {
  const response = await api.getNewMessageCount();
  dispatch(checkNewMessages(response.count));
};
