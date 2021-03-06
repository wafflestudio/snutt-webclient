import {
  GET_MESSAGE_START,
  GET_MESSAGE_OK,
  CHECK_NEW_MESSAGE_OK,
  OPEN_MESSAGE_BOX,
  CLOSE_MESSAGE_BOX,
} from '../actions/notification';
import { UPDATE_NEW_MESSAGE_COUNT } from '../actions/actionTypes';
import { TOGGLE_SEARCHPANEL } from '../actions/actionTypes';

const INITIAL_STATE = {
  fetching: false,
  offset: 0,
  messages: [],
  opened: false,
  hasNew: false,
};

const handlers = {
  [GET_MESSAGE_START]: (state, action) => ({
    fetching: true,
  }),

  [GET_MESSAGE_OK]: (state, action) => {
    const newMessages = action.response;
    const messages = state.messages.concat(newMessages);
    return {
      fetching: false,
      offset: messages.length,
      hasNew: false,
      messages,
    };
  },

  [UPDATE_NEW_MESSAGE_COUNT]: (state, action) => ({
    hasNew: action.count > 0,
  }),

  [CHECK_NEW_MESSAGE_OK]: (state, action) => {
    const { count } = action.response;
    return {
      hasNew: count > 0,
    };
  },

  [OPEN_MESSAGE_BOX]: (state, action) => ({ opened: true }),

  [CLOSE_MESSAGE_BOX]: (state, action) => ({ opened: false }),

  [TOGGLE_SEARCHPANEL]: (state, action) => ({ opened: false }),
};

export default function notificationReducer(state = INITIAL_STATE, action) {
  const handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
