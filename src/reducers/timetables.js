import Immutable from 'immutable'
import * as types from '../actions/actionTypes.js'

const DEFAULT_TIMETABLE = {
  currentIndex: 0,
  tables: Immutable.List([Immutable.List(), Immutable.List(), Immutable.List()]),
}

export function timeTables(state = DEFAULT_TIMETABLE, action) {
  const { currentIndex, tables } = state
  const currentTable = tables.get(currentIndex)

  switch(action.type) {
    case types.CHANGE_TIMETABLE:
      return Object.assign({}, state, {
        currentIndex: action.newTableIndex,
      })
    case types.ADD_TIMETABLE:
      return Object.assign({}, state, {
        tables: tables.push(Immutable.List()),
        currentIndex: tables.size,
      })
    case types.DELETE_TIMETABLE:
      return Object.assign({}, state, {
        tables: tables.delete(action.index),
        currentIndex: 0,
      })
    case types.ADD_COURSE:
      return Object.assign({}, state, {
        tables: tables.set(currentIndex, tables.get(currentIndex).push(action.course)),
      })
    case types.DELETE_COURSE:
      return Object.assign({}, state, {
        tables: tables.set(currentIndex,
          currentTable.delete(currentTable.findIndex(val => val._id == action.courseId))
        ),
      })
    case types.MODIFY_COURSE:
      const courseIndex = currentTable.findIndex(val => val._id == action.courseId)
      const courseToModify = currentTable.get(courseIndex)
      return Object.assign({}, state, {
        tables: tables.set(currentIndex,
          currentTable.set(courseIndex, Object.assign({}, courseToModify, action.modified))
        ),
      })
    default:
      return state
  }
}

const DEFAULT_TABLELIST = ({
  currentIndex: 0,
  tables: [[],[],[]],
})
export function tableList(state = DEFAULT_TABLELIST, action) {
  const { currentIndex, tables } = state
  switch (action.type) {
    case types.GET_TABLELIST:
      return {
        ...state,
        tables: JSON.parse(action.response)
      }
    case types.ADD_LECTURE_OK:
      return {
        ...state,
        tables: {
          ...tables,
          [currentIndex]: JSON.parse(action.response)
        }
      }
    default:
      return state
  }
}

export function tagList(state = {}, action) {
  switch (action.type) {
    case types.GET_TAG:
      return JSON.parse(action.response)
    default:
      return state
  }
}
