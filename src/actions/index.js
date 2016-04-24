import 'whatwg-fetch'
import * as types from './actionTypes'

export function selectCourse(course) {
  return { type: types.SELECT_COURSE, course }
}

export function unselectCourse() {
  return { type: types.UNSELECT_COURSE }
}

export function sendQuery(query) {
  return function(dispatch) {
    dispatch(startQuery())
    fetch('http://walnut.wafflestudio.com:3000/api/search_query', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    })
    .then(resp => resp.json())
    .then(json => json.map(checkColor))
    .then(json => dispatch(showResult(json)))
  }
}

function checkColor(val, index) {
  if (val.bgColor === undefined)
    val.bgColor = '#B7C7BB'
  if (val.fgColor === undefined)
    val.fgColor = '#1A1413'
  return val;
}

export function startQuery() {
  return { type: types.START_QUERY }
}

export function showResult(courses) {
  return { type: types.SHOW_RESULT, courses}
}

export function addCourse(course) {
  return { type: types.ADD_COURSE, course}
}

export function deleteCourse(courseId) {
  return { type: types.DELETE_COURSE, courseId}
}

export function modifyCourse(courseId, modification) {
  return { type: types.MODIFY_COURSE, courseId, modification}
}

export function changeTimeTable(newTableIndex) {
  return { type: types.CHANGE_TIMETABLE, newTableIndex }
}

export function addTimeTable() {
  return { type: types.ADD_TIMETABLE }
}

export function deleteTimeTable(index) {
  return { type: types.DELETE_TIMETABLE, index }
}

export function changeCoursebook(newCourseBook) {
  return { type: types.CHANGE_COURSEBOOK, newCourseBook }
}

export function toggleFilter() {
  return { type: types.TOGGLE_FILTER }
}

export function toggleModal() {
  return { type: types.TOGGLE_MODAL }
}
