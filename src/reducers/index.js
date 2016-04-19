import { combineReducers } from 'redux'
import {
  SELECT_COURSE, UNSELECT_COURSE, SEND_QUERY, START_QUERY, SHOW_RESULT,
  ADD_COURSE, DELETE_COURSE, CHANGE_TIMETABLE, ADD_TIMETABLE, DELETE_TIMETABLE,
  CHANGE_COURSEBOOK, TOGGLE_FILTER,
} from '../actions'
import timeTables from './timetables'

function selectedCourse(state = null, action) {
  switch(action.type) {
    case SELECT_COURSE:
      return action.course
    case UNSELECT_COURSE:
      return null
    case SHOW_RESULT:
      return null
    case CHANGE_TIMETABLE:
      return null
    default:
      return state
  }
}

function searchResults(state = [], action) {
  switch(action.type) {
    case SHOW_RESULT:
      return action.courses
    default:
      return state
  }
}

function courseBook(state = {year: 2016, semesterIdx: 1}, action) {
  switch(action.type) {
    case CHANGE_COURSEBOOK:
      return action.newCourseBook
    default:
      return state
  }
}

function isQuerying(state = false, action) {
  switch(action.type) {
    case START_QUERY:
      return true
    default:
      return false
  }
}

function filterOn(state = false, action) {
  switch(action.type) {
    case TOGGLE_FILTER:
      return !state
    default:
      return state
  }
}

const reducer = {
  timeTables,
  selectedCourse,
  searchResults,
  courseBook,
  isQuerying,
  filterOn,
}

// This file exports a mere object, which is to be combined at src/index.js later.
export default reducer
