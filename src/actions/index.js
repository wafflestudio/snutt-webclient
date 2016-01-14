import sampleResult from '../sampleResult'

export const SELECT_COURSE = 'SELECT_COURSE'
export const SEND_QUERY = 'SEND_QUERY'
export const SHOW_RESULT = 'SHOW_RESULT'
export const ADD_COURSE - 'ADD_COURSE'
export const CHANGE_TIMETABLE = 'CHANGE_TIMETABLE'
export const CHANGE_COURSEBOOK = 'CHANGE_COURSEBOOK'

export function selectCourse(course) {
  return { type:SELECT_COURSE, course }
}

export function sendQuery(query) {
  return dispatch => {
    showResult(sampleResult)
  }
}

export function showResult(courses) {
  return { type: SHOW_RESULT, courses}
}

export function addCourse(course) {
  return { type: ADD_COURSE, course}
}

export function changeTimetable(timetable) {
  return { type: CHANGE_TIMETABLE, timetable }
}

export function changeCoursebook(year, semesterIdx) {
  return { type: CHANGE_COURSEBOOK, year, semesterIdx }
}
