export const SELECT_COURSE = 'SELECT_COURSE'
export const UNSELECT_COURSE = 'UNSELECT_COURSE'
export const SEND_QUERY = 'SEND_QUERY'
export const START_QUERY = 'START_QUERY'
export const SHOW_RESULT = 'SHOW_RESULT'
export const ADD_COURSE = 'ADD_COURSE'
export const DELETE_COURSE = 'DELETE_COURSE'
export const MODIFY_COURSE = 'MODIFY_COURSE'
export const CHANGE_TIMETABLE = 'CHANGE_TIMETABLE'
export const ADD_TIMETABLE = 'ADD_TIMETABLE'
export const DELETE_TIMETABLE = 'DELETE_TIMETABLE'
export const CHANGE_COURSEBOOK = 'CHANGE_COURSEBOOK'
export const TOGGLE_FILTER = 'TOGGLE_FILTER'

import 'whatwg-fetch'

export function selectCourse(course) {
  return { type: SELECT_COURSE, course }
}

export function unselectCourse() {
  return { type: UNSELECT_COURSE }
}

export function sendQuery(query) {
  return function(dispatch) {
    dispatch(startQuery())
    fetch('http://walnut.wafflestudio.com:3000/api/search_query', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    })
    .then(resp => resp.json())
    .then(json => json.map(checkColor))
    .then(json => dispatch(showResult(json)))
  }
}

function checkColor(val, index) {
  if (val.bgColor === undefined)
    val.bgColor = "#B7C7BB"
  if (val.fgColor === undefined)
    val.fgColor = "#1A1413"
  return val;
}

export function startQuery() {
  return { type: START_QUERY }
}

export function showResult(courses) {
  return { type: SHOW_RESULT, courses}
}

export function addCourse(course) {
  return { type: ADD_COURSE, course}
}

export function deleteCourse(courseId) {
  return { type: DELETE_COURSE, courseId}
}

export function modifyCourse(courseId, modification) {
  return { type: MODIFY_COURSE, courseId, modification}
}

export function changeTimeTable(newTableIndex) {
  return { type: CHANGE_TIMETABLE, newTableIndex }
}

export function addTimeTable() {
  return { type: ADD_TIMETABLE }
}

export function deleteTimeTable(index) {
  return { type: DELETE_TIMETABLE, index }
}

export function changeCoursebook(newCourseBook) {
  return { type: CHANGE_COURSEBOOK, newCourseBook }
}

export function toggleFilter() {
  return { type: TOGGLE_FILTER }
}
