import Immutable from 'immutable'
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

// Must be convereted to plain JS when queried
const defaultQuery = Immutable.Map({
  year: 2016,
  semester: 1,
  title: '',
  classification: Immutable.Set(),
  credit: Immutable.Set(),
  academic_year: Immutable.Set(),
  instructor: Immutable.Set(),
  department: Immutable.Set(),
  category: Immutable.Set(),
  time_mask: Immutable.Set(),
})
function query(state = defaultQuery, action) {
  const { member, item } = action
  switch(action.type) {
    case types.ADD_QUERY:
      return state.update(member, l => l.add(item))
    case types.REMOVE_QUERY:
      return state.update(member, l => l.delete(item))
    case types.SET_QUERY:
      return state.set(member, item)
    case types.RESET_QUERY:
      return defaultQuery
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
  query,
  searchResults,
  courseBook,
  isQuerying,
  filterOn,
  modalOn,
  leftTabSearching,
}

// This file exports a mere object, which is to be combined at src/index.js later.
export default reducer
