import Immutable from 'immutable'
import * as ACTIONS from '../actions'

const DEFAULT_STATE = {
  currentIndex: 0,
  tables: Immutable.List([Immutable.List(), Immutable.List(), Immutable.List()])
}

export default function timeTables(state = DEFAULT_STATE, action) {
  const { currentIndex, tables } = state
  const currentTable = tables.get(currentIndex)

  switch(action.type) {
    case ACTIONS.CHANGE_TIMETABLE:
      return Object.assign({}, state, {
        currentIndex: action.newTableIndex
      })
    case ACTIONS.ADD_TIMETABLE:
      return Object.assign({}, state, {
        tables: tables.push(Immutable.List()),
        currentIndex: tables.size
      })
    case ACTIONS.DELETE_TIMETABLE:
      return Object.assign({}, state, {
        tables: tables.delete(action.index),
        currentIndex: 0
      })
    case ACTIONS.ADD_COURSE:
      return Object.assign({}, state, {
        tables: tables.set(currentIndex, tables.get(currentIndex).push(action.course))
      })
    case ACTIONS.DELETE_COURSE:
      return Object.assign({}, state, {
        tables: tables.set(currentIndex,
          currentTable.delete(currentTable.findIndex(val => val._id == action.courseId))
        )
      })
    default:
      return state
  }
}
