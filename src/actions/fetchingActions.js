import 'whatwg-fetch'

import * as types from './actionTypes'
import { CALL_API } from '../middleware/api'
import { FETCH_TAG, GET_TAG, FAIL_TAG } from './actionTypes'
import { baseUrl, apiKey } from '../samples/sampleKey'
import { fetchTableList } from './tableActions'

export function updateCoursebook() {
  return function(dispatch) {
    fetch(baseUrl + 'course_books/', {
      method: 'get',
      headers: {
        'x-access-apikey': apiKey,
        'Content-Type': 'application/json',
      },
    })
    .then(resp => resp.json())
    .catch(ex => console.log("Request failed", ex))
    .then(json => dispatch(fetchCoursebook(json)))
  }
}

// Not sure whether dispatching multiple actions at once is good practice...
export function fetchCoursebook(courseBooks) {
  return function(dispatch) {
    const recentBook = courseBooks[0]
    dispatch(changeCoursebook(recentBook))
    dispatch({ type: types.FETCH_COURSEBOOK, courseBooks })
  }
}

// Set of actions that should be along with new coursebook
export function changeCoursebook(newCourseBook) {
  return function(dispatch) {
    const { year: newYear, semester: newSemester } = newCourseBook
    dispatch(updateTag(newYear, newSemester))
    dispatch(fetchTableList(newYear, newSemester))
    dispatch({ type: types.CHANGE_COURSEBOOK, newCourseBook })
  }
}

export function updateTag(year, semester) {
  return {
    [CALL_API]: {
      endpoint: `tags/${year}/${semester}`,
      config: { method: 'get', },
      types: [ FETCH_TAG, GET_TAG, FAIL_TAG ],
    }
  }
}
