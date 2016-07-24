import 'whatwg-fetch'
import * as types from './actionTypes'

export function hoverCourse(course) {
  return { type: types.HOVER_COURSE, course }
}

export function unhoverCourse() {
  return { type: types.UNHOVER_COURSE }
}

export function addQuery(member, item) {
  return { type: types.ADD_QUERY, member, item }
}

export function updateQuery(member, func) {
  return { type: types.UPDATE_QUERY, member, func}
}

export function removeQuery(member, item) {
  return { type: types.REMOVE_QUERY, member, item }
}

export function resetQuery() {
  return { type: types.RESET_QUERY }
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

function checkColor(val) {
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

export function modifyCourse(courseId, modified) {
  return { type: types.MODIFY_COURSE, courseId, modified}
}

export function openCourse(course) {
  return { type: types.OPEN_COURSE, course }
}

export function closeCourse(save, modified) {
  return function(dispatch) {
    dispatch(toggleModal())
    if (save)
      dispatch(modifyCourse(modified._id, modified))
  }
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

export function toggleSearchPanel() {
  return { type: types.TOGGLE_SEARCHPANEL }
}

export function toggleTimeselect() {
  return { type: types.TOGGLE_TIMESELECT }
}

export function toggleModal() {
  return { type: types.TOGGLE_MODAL }
}

export function setLeftTab(searching) {
  return { type: types.SET_LEFT_TAB, searching }
}
