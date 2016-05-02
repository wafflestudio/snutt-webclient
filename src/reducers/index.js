import * as types from '../actions/actionTypes'
import timeTables from './timetables'

function selectedCourse(state = null, action) {
  switch(action.type) {
    case types.SELECT_COURSE:
      return action.course
    case types.UNSELECT_COURSE:
      return null
    case types.SHOW_RESULT:
      return null
    case types.CHANGE_TIMETABLE:
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

const reducer = {
  timeTables,
  selectedCourse,
  editingCourse,
  searchResults,
  courseBook,
  isQuerying,
  filterOn,
  modalOn,
}

// This file exports a mere object, which is to be combined at src/index.js later.
export default reducer
