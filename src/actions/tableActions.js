import { CALL_API } from '../middleware/api'
import { REQUEST_TABLELIST, GET_TABLELIST, FAIL_TABLELIST, ADD_LECTURE_START,
  ADD_LECTURE_OK, ADD_LECTURE_FAIL, DELETE_LECTURE_START, DELETE_LECTURE_OK,
  DELETE_LECTURE_FAIL  } from './actionTypes'

export function fetchTableList(year, semester) {
  return {
    [CALL_API]: {
      endpoint: `tables/${year}/${semester}`,
      config: { method: 'get', },
      authenticated: true,
      types: [ REQUEST_TABLELIST, GET_TABLELIST, FAIL_TABLELIST ],
    }
  }
}

export function addLecture(lecture) {
  return function (dispatch, getState) {
    const { tableList: { currentIndex, tables } } = getState()
    const currentTableId = tables[currentIndex]._id
    dispatch({
      [CALL_API]: {
        endpoint: `tables/${currentTableId}/lecture`,
        config: {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lecture),
        },
        authenticated: true,
        types: [ ADD_LECTURE_START, ADD_LECTURE_OK, ADD_LECTURE_FAIL ]
      }
    })
  }
}

export function deleteLecture(lectureId) {
  return function (dispatch, getState) {
    const { tableList: { currentIndex, tables } } = getState()
    const currentTableId = tables[currentIndex]._id
    dispatch({
      [CALL_API]: {
        endpoint: `tables/${currentTableId}/lecture/${lectureId}`,
        config: {
          method: 'delete',
        },
        authenticated: true,
        types: [ DELETE_LECTURE_START, DELETE_LECTURE_OK, DELETE_LECTURE_FAIL ]
      }
    })
  }
}
