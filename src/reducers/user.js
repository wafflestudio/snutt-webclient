import Immutable from 'immutable'
import { REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_SUCCESS, LOGIN_FAILURE,
LOGIN_TEMP, LOGOUT_SUCCESS } from '../actions/userActions'

const INITIAL_STATE = {
  loggedIn: false,
  id: '',
  errorType: null,
  message: '',
}

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, INITIAL_STATE, {loggedIn: true, id: action.id})
    case LOGIN_FAILURE:
      return Object.assign({}, state, {loggedIn: false, errorType: 'login', message: action.message})
    case LOGOUT_SUCCESS:
      return INITIAL_STATE
    case LOGIN_TEMP:
      return Object.assign({}, INITIAL_STATE, {loggedIn: false, id: action.id })
    case REGISTER_FAILURE:
      return Object.assign({}, state, {loggedIn: false, errorType: 'register', message: action.message, type: action.type})
    default:
      return state
  }
}
