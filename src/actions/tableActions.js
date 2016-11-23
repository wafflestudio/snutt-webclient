import { CALL_API } from '../middleware/api'
import { REQUEST_TABLELIST, GET_TABLELIST, FAIL_TABLELIST, ADD_LECTURE_START,
  ADD_LECTURE_OK, ADD_LECTURE_FAIL, DELETE_LECTURE_START, DELETE_LECTURE_OK,
  DELETE_LECTURE_FAIL, UPDATE_TITLE_START, UPDATE_TITLE_OK, UPDATE_TITLE_FAIL,
  UPDATE_LECTURE_START, UPDATE_LECTURE_OK, UPDATE_LECTURE_FAIL,
  CREATE_TABLE_START, CREATE_TABLE_OK, CREATE_TABLE_FAIL,
  DELETE_TABLE_START, DELETE_TABLE_OK, DELETE_TABLE_FAIL,
  SWITCH_TABLE_START, SWITCH_TABLE_OK, SWITCH_TABLE_FAIL,
  CREATE_COURSE, EDIT_COURSE, CLOSE_COURSE
} from './actionTypes'

export function fetchTableList(year, semester) {
  return {
    [CALL_API]: {
      endpoint: `tables/${year}/${semester}`,
      config: { method: 'get', },
      authenticated: true,
      types: [ REQUEST_TABLELIST, GET_TABLELIST, FAIL_TABLELIST ],
      payload: { year, semester },
    }
  }
}

export const createCourse = () => ({ type: CREATE_COURSE, course: {} })
export function addLecture(lecture) {
  return function (dispatch, getState) {
    const { currentId } = getState().tableList
    dispatch({
      [CALL_API]: {
        endpoint: `tables/${currentId}/lecture`,
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
    const { currentId } = getState().tableList
    dispatch({
      [CALL_API]: {
        endpoint: `tables/${currentId}/lecture/${lectureId}`,
        config: {
          method: 'delete',
        },
        authenticated: true,
        types: [ DELETE_LECTURE_START, DELETE_LECTURE_OK, DELETE_LECTURE_FAIL ],
      }
    })
  }
}
export const editCourse = (course) => ({ type: EDIT_COURSE, course })
export const closeCourse = (course) => ({ type: CLOSE_COURSE })
export function updateLecture(lectureId, updatedPart) {
  return function (dispatch, getState) {
    const { currentId: currentTableId } = getState().tableList
    dispatch({
      [CALL_API]: {
        endpoint: `tables/${currentTableId}/lecture/${lectureId}`,
        config: {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedPart),
        },
        authenticated: true,
        types: [ UPDATE_LECTURE_START, UPDATE_LECTURE_OK, UPDATE_LECTURE_FAIL ],
      }
    })
  }
}

export function updateTitle(newTitle) {
  return function (dispatch, getState) {
    const { currentId } = getState().tableList
    dispatch({
      [CALL_API]: {
        endpoint: `tables/${currentId}/`,
        config: {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({title: newTitle}),
        },
        authenticated: true,
        types: [ UPDATE_TITLE_START, UPDATE_TITLE_OK, UPDATE_TITLE_FAIL ],
      }
    })
  }
}

export function createTable(newTitle) {
  return function (dispatch, getState) {
    const currentBook = getState().courseBook.get('current')
    const { year , semester } = currentBook

    dispatch({
      [CALL_API]: {
        endpoint: `tables/`,
        config: {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: newTitle,
            year: year,
            semester: semester,
          }),
        },
        authenticated: true,
        types: [ CREATE_TABLE_START, CREATE_TABLE_OK, CREATE_TABLE_FAIL ],
      }
    })
  }
}

export function deleteTable(_id) {
  return function (dispatch, getState) {
    dispatch({
      [CALL_API]: {
        endpoint: `tables/${_id}`,
        config: {
          method: 'delete',
        },
        authenticated: true,
        types: [ DELETE_TABLE_START, DELETE_TABLE_OK, DELETE_TABLE_FAIL ],
      }
    })
  }
}

export function switchTable(_id) {
    return function (dispatch) {
      dispatch({
        [CALL_API]: {
          endpoint: `tables/${_id}`,
          config: {
            method: 'get',
          },
          authenticated: true,
          types: [ SWITCH_TABLE_START, SWITCH_TABLE_OK, SWITCH_TABLE_FAIL ],
        }
      })
  }
}
