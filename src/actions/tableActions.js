import { CALL_API } from '../middleware/api'
import { REQUEST_TABLELIST, GET_TABLELIST, FAIL_TABLELIST } from './actionTypes'

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

export function addLecture(id, lecture) {
  return {
    [CALL_API]: {
      endpoint: `tables/${id}/lecture`,
      config: {
        method: 'post',
        header: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lecture),
      },
      authenticated: true,
      types: [ ADD_LECTURE_START, ADD_LECTURE_OK, ADD_LECTURE_FAIL ]
    }
  }
}
