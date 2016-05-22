import * as types from '../actions/actionTypes'
import timeTables from './timetables'

function hoveredCourse(state = null, action) {
  switch(action.type) {
    case types.HOVER_COURSE:
      return action.course
    case types.UNHOVER_COURSE:
      return null
    default:
      return state
  }
}

function editingCourse(state = null, action) {
  switch(action.type) {
    case types.OPEN_COURSE:
      return action.course
    case types.CLOSE_COURSE:
      return null
    default:
      return state
  }
}

function searchResults(state = [], action) {
  switch(action.type) {
    case types.START_QUERY:
      return []
    case types.SHOW_RESULT:
      return action.courses
    default:
      return state
  }
}

function courseBook(state = {year: 2016, semesterIdx: 1}, action) {
  switch(action.type) {
    case types.CHANGE_COURSEBOOK:
      return action.newCourseBook
    default:
      return state
  }
}

function isQuerying(state = false, action) {
  switch(action.type) {
    case types.START_QUERY:
      return true
    default:
      return false
  }
}

function filterOn(state = false, action) {
  switch(action.type) {
    case types.TOGGLE_FILTER:
      return !state
    default:
      return state
  }
}

function modalOn(state = false, action) {
  switch(action.type) {
    case types.TOGGLE_MODAL:
      return !state
    case types.OPEN_COURSE:
      return true
    default:
      return state
  }
}

function leftTabSearching(state = true, action) {
  switch(action.type) {
    case types.SET_LEFT_TAB:
      return action.searching
    case types.START_QUERY:
      return true
    default:
      return state
  }
}

const reducer = {
  timeTables,
  hoveredCourse,
  editingCourse,
  searchResults,
  courseBook,
  isQuerying,
  filterOn,
  modalOn,
  leftTabSearching,
}

// This file exports a mere object, which is to be combined at src/index.js later.
export default reducer
