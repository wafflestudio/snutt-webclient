import 'whatwg-fetch'
import * as types from './actionTypes'
import { apiKey, baseUrl } from '../samples/sampleKey.js'
import colorList from '../utils/colorList'

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
    dispatch(startQuery(query))
    fetch(baseUrl + 'search_query/', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'x-access-apikey': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    })
    .then(resp => resp.json())
    .then(json => json.map(checkAndAssignColor))
    .then(json => dispatch(showResult(json)))
  }
}

function checkAndAssignColor(course) {
  if (course.bgColor === undefined && course.fgColor === undefined) {
    const randomIndex = Math.floor(Math.random() * colorList.length)
    const assignedColor = colorList[randomIndex]
    course.color = assignedColor
  }
  return course;
}

export function startQuery(query) {
  return { type: types.START_QUERY, sent: query }
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

export function changeTimeTable(newTableIndex) {
  return { type: types.CHANGE_TIMETABLE, newTableIndex }
}

export function addTimeTable() {
  return { type: types.ADD_TIMETABLE }
}

export function deleteTimeTable(index) {
  return { type: types.DELETE_TIMETABLE, index }
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
