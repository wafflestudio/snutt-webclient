// I'm planning to stop using Immutable.js
import Immutable from 'immutable'
import update from 'react-addons-update'
import * as types from '../actions/actionTypes.js'

const DEFAULT_TABLELIST = {
  currentId: null,
  tableIndex: [],
  tableMap: {},
}

export function tableList(state = DEFAULT_TABLELIST, action) {
  const { currentIndex, tableMap, tableIndex } = state
  switch (action.type) {
    case types.GET_TABLELIST:
      const tableArray = JSON.parse(action.response)
      const mapped = tableArray.reduce((obj, current)=> {
        obj[current._id] = current
        return obj
      }, {})
      const currentId = tableArray.length > 0 ? tableArray[0]._id : null
     return {
        currentId,
        tableIndex: tableArray,
        tableMap: mapped,
      }
    case types.ADD_LECTURE_OK: {
      const updated = JSON.parse(action.response)
      return {
        ...state,
        tableMap: update(tableMap, {[updated._id]: {$set: updated}})
      }
    }
    case types.DELETE_LECTURE_OK: {
      const updated = JSON.parse(action.response)
      return {
        ...state,
        tableMap: update(tableMap, {[updated._id]: {$set: updated}})
      }
    }
    case types.UPDATE_TITLE_OK: {
      const { year, semester } = state.tableMap[state.currentId]
      const newIndex = JSON.parse(action.response).filter(val =>
        val.year === year && val.semester === semester
      )
      return {
        ...state,
        tableIndex: update(tableIndex, {$set: newIndex})
      }
    }
    case types.UPDATE_LECTURE_OK: {
      const updatedTable = JSON.parse(action.response)
      const updatedId = updatedTable._id
      return {
        ...state,
        tableMap: update(tableMap, {[updatedId]: {$set: updatedTable}})
      }
    }
    case types.CREATE_TABLE_OK: {
      const { year, semester } = state.tableMap[state.currentId]
      const newIndex = JSON.parse(action.response).filter(val =>
        val.year === year && val.semester === semester
      )
      return {
        ...state,
        tableIndex: update(tableIndex, {$set: newIndex})
      }
    }
    case types.DELETE_TABLE_OK: {
      const { year, semester } = state.tableMap[state.currentId]
      const newIndex = JSON.parse(action.response).filter(val =>
        val.year === year && val.semester === semester
      )
      return {
        ...state,
        currentId: newIndex[0]._id,
        tableIndex: update(tableIndex, {$set: newIndex})
      }
    }
    case types.SWITCH_TABLE_OK: {
      const updatedTable = JSON.parse(action.response)
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
      return JSON.parse(action.response)
    default:
      return state
  }
}
