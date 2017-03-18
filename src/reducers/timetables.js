import update from 'react-addons-update'
import * as types from '../actions/actionTypes.js'

/**
 * currentId: '_id' field of current timetable object
 * tableIndex: { id, year, semester, title } of tables
 * tableMap: object of whole tables
 */
const DEFAULT_TABLELIST = {
  currentId: null,
  tableIndex: [],
  tableMap: {},
  year: null,
  semester: null,
}

export function tableList(state = DEFAULT_TABLELIST, action) {
  const { currentIndex, tableMap, tableIndex } = state
  switch (action.type) {
    case types.GET_TABLELIST: {
      const tableArray = action.response
      const mapped = tableArray.reduce((obj, current)=> {
        obj[current._id] = current
        return obj
      }, {})
      const currentId = tableArray.length > 0 ? tableArray[0]._id : null
      const { year , semester } = action.payload
      return {
        currentId,
        tableIndex: tableArray,
        tableMap: mapped,
        year,
        semester,
      }
    }
    case types.ADD_LECTURE_OK: {
      const updated = action.response
      return {
        ...state,
        tableMap: update(tableMap, {[updated._id]: {$set: updated}})
      }
    }
    case types.DELETE_LECTURE_OK: {
      const updated = action.response
      return {
        ...state,
        tableMap: update(tableMap, {[updated._id]: {$set: updated}})
      }
    }
    case types.UPDATE_TITLE_OK: {
      const { year, semester } = state.tableMap[state.currentId]
      const newIndex = action.response.filter(val =>
        val.year === year && val.semester === semester
      )
      return {
        ...state,
        tableIndex: update(tableIndex, {$set: newIndex})
      }
    }
    case types.UPDATE_LECTURE_OK: {
      const updatedTable = action.response
      const updatedId = updatedTable._id
      return {
        ...state,
        tableMap: update(tableMap, {[updatedId]: {$set: updatedTable}})
      }
    }
    case types.CREATE_TABLE_OK: {
      const { year, semester } = state
      const newIndex = action.response.filter(val =>
        val.year === year && val.semester === semester
      )
      return {
        ...state,
        tableIndex: update(tableIndex, {$set: newIndex})
      }
    }
    case types.DELETE_TABLE_OK: {
      const { year, semester } = state
      const newIndex = action.response.filter(val =>
        val.year === year && val.semester === semester
      )
      return {
        ...state,
        currentId: newIndex.length === 0 ? null : newIndex[0]._id,
        tableIndex: update(tableIndex, {$set: newIndex})
      }
    }
    case types.SWITCH_TABLE_OK: {
      const updatedTable = action.response
      const updatedId = updatedTable._id
      return {
        ...state,
        currentId: updatedId,
        tableMap: update(tableMap, {[updatedId]: {$set: updatedTable}})
      }
    }
    case types.LOGOUT_SUCCESS:
      return DEFAULT_TABLELIST
    default:
      return state
  }
}

export function tagList(state = {}, action) {
  switch (action.type) {
    case types.GET_TAG:
      return action.response
    default:
      return state
  }
}
