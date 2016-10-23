import Immutable from 'immutable'
import * as types from '../actions/actionTypes.js'

const INITIAL_STATE = {
  loggedIn: false,
  id: '',
  errorType: null,
  message: '',
}

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return Object.assign({}, INITIAL_STATE, {loggedIn: true, id: action.id})
    case types.LOGIN_FAILURE:
      return Object.assign({}, state, {loggedIn: false, errorType: 'login', message: action.message})
    case types.LOGOUT_SUCCESS:
      return INITIAL_STATE
    case types.REGISTER_FAILURE:
      return Object.assign({}, state, {loggedIn: false, errorType: 'register', message: action.message, type: action.type})
    default:
      return state
  }
}
