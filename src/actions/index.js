import 'whatwg-fetch';
import * as types from './actionTypes';
import { apiKey, baseUrl } from '../config.js';
import { complement } from '../components/MakeTimetable/Search/TimeQuery.jsx';

export function hoverCourse(course) {
  return { type: types.HOVER_COURSE, course };
}

export function unhoverCourse() {
  return { type: types.UNHOVER_COURSE };
}

export function tableHoverCourse(course) {
  return { type: types.TABLE_HOVER_COURSE, course };
}

export function tableUnhoverCourse() {
  return { type: types.TABLE_UNHOVER_COURSE };
}

export function addQuery(member, item) {
  return { type: types.ADD_QUERY, member, item };
}

export function updateQuery(member, func) {
  return { type: types.UPDATE_QUERY, member, func };
}

export function removeQuery(member, item) {
  return { type: types.REMOVE_QUERY, member, item };
}

export function resetQuery() {
  return { type: types.RESET_QUERY };
}

export function runQuery(textQuery) {
  return (dispatch, getState) => {
    const {
      courseBook,
      query,
      filter: { useTime, searchEmptySlot },
      tableList: { viewLectures },
    } = getState();
    const { year, semester } = courseBook.get('current');
    const queries = query.toJS();

    const validQuery = { year, semester, title: textQuery, limit: 200 };

    // Add valid(?) fields to query
    for (const key in queries) {
      const value = queries[key];
      if (typeof value === 'object' && value.length > 0) {
        validQuery[key] = value;
      }
    }

    // Handle times
    if (!useTime) {
      delete validQuery.time_mask;
    } else if (searchEmptySlot) {
      // use free time as query
      const currentMasks = viewLectures.map(lecture => lecture.class_time_mask);
      const invertedMasks = complement(currentMasks);
      validQuery.time_mask = invertedMasks;
    } else {
      // Time selector already updated time_mask
    }
    dispatch(sendQuery(validQuery));
  };
}

export function sendQuery(query) {
  return function(dispatch) {
    dispatch(startQuery(query));
    fetch(`${baseUrl}search_query/`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'x-access-apikey': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    })
      .then(resp => resp.json())
      .then(json => dispatch(showResult(json)));
  };
}

export function startQuery(query) {
  return { type: types.START_QUERY, sent: query };
}

export function showResult(courses) {
  return { type: types.SHOW_RESULT, courses };
}

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

export function toggleSearchPanel() {
  return { type: types.TOGGLE_SEARCHPANEL };
}

export function toggleTimePanel() {
  return { type: types.TOGGLE_TIMEPANEL };
}

export const toggleUseTime = () => ({ type: types.TOGGLE_USETIME });
export const selectTimeMode = mode => ({ type: types.SELECT_TIMEMODE, mode });

export function toggleModal() {
  return { type: types.TOGGLE_MODAL };
}

export function setLeftTab(searching) {
  return { type: types.SET_LEFT_TAB, searching };
}
