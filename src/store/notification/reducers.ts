import { Reducer } from 'redux';

import {
  NotificationState,
  NotficationActionTypes,
  GET_MESSAGE_OK,
  OPEN_MESSAGE_BOX,
  CLOSE_MESSAGE_BOX,
  CHECK_NEW_MESSAGE_OK,
} from './types';

const initialState: NotificationState = {
  fetching: false,
  offset: 0,
  messages: [],
  opened: false,
  hasNew: false,
};

export const notificationReducer: Reducer<
  NotificationState,
  NotficationActionTypes
> = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MESSAGE_BOX:
      return { ...state, opened: true };
    case CLOSE_MESSAGE_BOX:
      return { ...state, opened: false };
    case GET_MESSAGE_OK:
      return {
        ...state,
        fetching: false,
        offset: action.messages.length,
        hasNew: false,
        messages: [...state.messages, ...action.messages],
      };
    case CHECK_NEW_MESSAGE_OK:
      return {
        ...state,
        hasNew: action.count > 0,
      };
    default:
      return state;
  }
};
