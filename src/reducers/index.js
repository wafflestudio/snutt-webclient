import { combineReducers } from 'redux'
import {
  SELECT_COURSE, SEND_QUERY, SHOW_RESULT,
  ADD_COURSE, CHANGE_TIMETABLE, CHANGE_COURSEBOOK
} from '../actions'
import _ from 'lodash'

function selectedCourse(state=null, action) {
  switch(action.type) {
    case SELECT_COURSE:
      return action.course
    default:
      return state
  }
}

function searchResults(state=[], action) {
  switch(action.type) {
    case SHOW_RESULT:
      return action.courses
    default:
      return state
  }
}

function timeTable(state = [], action) {
  switch(action.type) {
    case ADD_COURSE:
      return _.cloneDeep(state).push(action.course)
    default:
      return state
  }
}

function courseBook(state = {year: 2016, semesterIdx: 1}, action) {
  switch(action.type) {
    case CHANGE_COURSEBOOK:
      return {year: action.year, semesterIdx: action.semesterIdx}
    default:
      return state
  }
}

const reducer = {
  selectedCourse,
  searchResults,
  timeTable,
  courseBook
}

export default reducer
