import Immutable from 'immutable';
import * as types from '../actions/actionTypes';
import { tableList, tagList } from './timetables';
import user from './user';
import notification from './notification';

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

// It's something more like filter...I have to rename all the variables someday
export const defaultQuery = Immutable.Map({
  classification: Immutable.Set(),
  credit: Immutable.Set(),
  academic_year: Immutable.Set(),
  instructor: Immutable.Set(),
  department: Immutable.Set(),
  category: Immutable.Set(),
  time_mask: Immutable.List([0, 0, 0, 0, 0, 0]),
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

function searchResults(state = [], action) {
  switch (action.type) {
    case types.START_QUERY:
      return [];
    case types.SHOW_RESULT:
      return action.courses;
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

function filter(state = { panel: false, time: false }, action) {
  const { panel, time } = state;
  switch (action.type) {
    case types.TOGGLE_SEARCHPANEL:
      return { panel: !panel, time: false };
    case types.TOGGLE_TIMESELECT:
      return { panel, time: !time };
    case types.SHOW_RESULT:
      return { panel: false, time: false };
    default:
      return state;
  }
}

function leftTabSearching(state = true, action) {
  switch (action.type) {
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
