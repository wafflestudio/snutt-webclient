import Immutable from 'immutable'
import * as types from '../actions/actionTypes.js'

const INITIAL_STATE = {
  loggedIn: false,
  id: '',
  hadError: false,
  message: '',
}

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {'loggedIn': true, 'id': action.id, 'hadError': false})
    case types.LOGIN_FAILURE:
      return Object.assign({}, state, {'loggedIn': false, hadError: true, message: action.message})
    case types.LOGOUT_SUCCESS:
      return INITIAL_STATE
    case types.REGISTER_FAILURE:
      return Object.assign({}, state, {'loggedIn': false, hadError: true, message: action.message})
    default:
      return state
  }
}
