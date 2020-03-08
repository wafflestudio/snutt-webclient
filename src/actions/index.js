import * as types from './actionTypes';

export function addCourse(course) {
  return { type: types.ADD_COURSE, course };
}

export function deleteCourse(courseId) {
  return { type: types.DELETE_COURSE, courseId };
}

export function changeTimeTable(newTableIndex) {
  return { type: types.CHANGE_TIMETABLE, newTableIndex };
}

export function addTimeTable() {
  return { type: types.ADD_TIMETABLE };
}

export function deleteTimeTable(index) {
  return { type: types.DELETE_TIMETABLE, index };
}

