import { GET_MESSAGE_START, GET_MESSAGE_OK, CHECK_NEW_MESSAGE_OK,
  TOGGLE_MESSAGE_BOX
} from '../actions/notification'

const INITIAL_STATE = {
  fetching: false,
  offset: 0,
  messages: [],
  opened: true,
  hasNew: false,
}

const handlers = {

  [GET_MESSAGE_START]: (state, action) => ({
    fetching: true,
  }),

  [GET_MESSAGE_OK]: (state, action) => {
    const newMessages = JSON.parse(action.response)
    const messages = state.messages.append(newMessages)
    return {
      fetching: false,
      offset: messages.length,
      messages,
    }
  },

  [CHECK_NEW_MESSAGE_OK]: (state, action) => {
    const { count } = JSON.parse(action.response)
    return {
      hasNew: count > 0 ? true : false,
    }
  },

  [TOGGLE_MESSAGE_BOX]: (state, action) => ({ opened: !state.opened }),

}

export default function notificationReducer (state = INITIAL_STATE, action) {
  let handler = handlers[action.type]
  if (!handler) return state
  return { ...state, ...handler(state, action) }
}
