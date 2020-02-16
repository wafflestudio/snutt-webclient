import Immutable from 'immutable';
import * as types from '../actions/actionTypes';
import { tableList, tagList } from './timetables';
import user from './user';
import notification from 'ducks/notification'

// Hovering over resultTable on left side
function hoveredCourse(state = null, action) {
  switch (action.type) {
    case types.HOVER_COURSE:
      return action.course;
    case types.UNHOVER_COURSE:
      return null;
    default:
      return state;
  }
}

// Hovering over timetable on right side
function tableHoveredCourse(state = null, action) {
  switch (action.type) {
    case types.TABLE_HOVER_COURSE:
      return action.course;
    case types.TABLE_UNHOVER_COURSE:
      return null;
    default:
      return state;
  }
}

// It's something more like filter...I have to rename all the variables someday
export const defaultQuery = Immutable.Map({
  classification: Immutable.Set(),
  credit: Immutable.Set(),
  academic_year: Immutable.Set(),
  instructor: Immutable.Set(),
  department: Immutable.Set(),
  category: Immutable.Set(),
  etc: Immutable.Set(),
  time_mask: Immutable.List([0, 0, 0, 0, 0, 0, 0]),
});

function query(state = defaultQuery, action) {
  const { member, item, func } = action;
  switch (action.type) {
    case types.ADD_QUERY:
      return state.update(member, l => l.add(item));
    case types.REMOVE_QUERY:
      return state.update(member, l => l.delete(item));
    case types.UPDATE_QUERY:
      return state.update(member, i => func(i));
    case types.RESET_QUERY:
      return defaultQuery;
    default:
      return state;
  }
}

function searchResults(state = null, action) {
  switch (action.type) {
    case types.START_QUERY:
      return [];
    case types.SHOW_RESULT:
      return action.courses;
    case types.CHANGE_COURSEBOOK:
      return [];
    default:
      return state;
  }
}

const defaultCoursebook = Immutable.fromJS({
  available: [],
  current: null,
});

function courseBook(state = defaultCoursebook, action) {
  switch (action.type) {
    case types.LOAD_OK:
      const { courseBooks } = action;
      return state.set('available', courseBooks);
    case types.FETCH_COURSEBOOK:
      return state.set('available', action.courseBooks);
    case types.CHANGE_COURSEBOOK:
      return state.set('current', action.newCourseBook);
    default:
      return state;
  }
}

function isQuerying(state = false, action) {
  switch (action.type) {
    case types.START_QUERY:
      return true;
    default:
      return false;
  }
}

function filter(
  state = {
    panel: false,
    timePanel: false,
    useTime: false,
    searchEmptySlot: true,
  },
  action,
) {
  /**
   * panel: whether search filter is on or off
   * timePanel: whether time selecting panel is on or off
   * useTime: whether to use time query or not
   * searchEmptySlot: If true, use empty slots as query, Else, use selected range of time for query
   */
  const { panel, timePanel, useTime } = state;
  switch (action.type) {
    case types.TOGGLE_SEARCHPANEL:
      return { ...state, panel: !panel };
    case types.TOGGLE_TIMEPANEL:
      return { ...state, timePanel: !timePanel };
    case types.TOGGLE_USETIME:
      return { ...state, useTime: !useTime };
    case types.SELECT_TIMEMODE:
      return { ...state, searchEmptySlot: action.mode };
    case types.SHOW_RESULT:
      return { ...state, panel: false };
    default:
      return state;
  }
}

function leftTabSearching(state = false, action) {
  switch (action.type) {
    case types.CHANGE_COURSEBOOK:
      return false;
    case types.SET_LEFT_TAB:
      return action.searching;
    case types.START_QUERY:
      return true;
    default:
      return state;
  }
}

const courseEditorDefault = {
  isOpen: false,
  course: null,
};
function courseEditor(state = courseEditorDefault, action) {
  switch (action.type) {
    case types.CREATE_COURSE:
    case types.EDIT_COURSE:
      return { isOpen: true, course: action.course };
    case types.ADD_LECTURE_OK:
    case types.UPDATE_LECTURE_OK:
    case types.CLOSE_COURSE:
      return courseEditorDefault;
    default:
      return state;
  }
}

const reducer = {
  hoveredCourse,
  tableHoveredCourse,
  query,
  searchResults,
  courseBook,
  isQuerying,
  filter,
  leftTabSearching,
  user,
  tableList,
  tagList,
  courseEditor,
  notification,
};

// This file exports a mere object, which is to be combined at src/index.js later.
export default reducer;
