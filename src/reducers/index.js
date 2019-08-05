import * as types from '../actions/actionTypes';

import { notificationReducer } from 'store/notification/reducers';
import { courseEditorReducer } from 'store/courseEditor/reducers';
import { timetableReducer } from 'store/timetable/reducers';
import { courseBookReducer } from 'store/courseBook/reducers';
import { userReducer } from 'store/user/reducers';
import { searchReducer } from 'store/search/reducers';

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

const reducer = {
  hoveredCourse,
  tableHoveredCourse,
  courseBook: courseBookReducer,
  user: userReducer,
  tableList: timetableReducer,
  courseEditor: courseEditorReducer,
  notification: notificationReducer,
  search: searchReducer,
};

// This file exports a mere object, which is to be combined at src/index.js later.
export default reducer;
