import { combineReducers } from 'redux'
import {
  SELECT_COURSE, UNSELECT_COURSE, SEND_QUERY, SHOW_RESULT,
  ADD_COURSE, DELETE_COURSE, CHANGE_TIMETABLE, CHANGE_COURSEBOOK
} from '../actions'
import Immutable from 'immutable'

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

function timeTables(state, action) {
  if (typeof state === 'undefined') { // inital state
    var emptyTables = Immutable.List()
    for (var i = 0; i < 3; i++) {
      emptyTables = emptyTables.push(Immutable.List())
    }
    return {
      currentIndex: 0,
      tables: emptyTables
    }
  }
  const { currentIndex, tables } = state
  const currentTable = tables.get(currentIndex)

  switch(action.type) {
    case CHANGE_TIMETABLE:
      return Object.assign({}, state, {
        currentIndex: action.newTableIndex
      })
    case ADD_COURSE:
      return Object.assign({}, state, {
        tables: tables.set(currentIndex, tables.get(currentIndex).push(action.course))
      })
    case DELETE_COURSE:
      return Object.assign({}, state, {
        tables: tables.set(currentIndex,
          currentTable.delete(currentTable.findIndex(val => val._id == action.courseId))
        )
      })
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
  timeTables,
  courseBook
}

export default reducer
