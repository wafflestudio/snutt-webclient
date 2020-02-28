import Immutable from 'immutable';
import * as types from '../actions/actionTypes';
import { changeCoursebook } from 'ducks/coursebook';
import { notification, courseEditor, courseBook, ui, user } from 'ducks';

import { tableList, tagList } from './timetables';

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
    case changeCoursebook.type:
      return [];
    default:
      return state;
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

const reducer = {
  query,
  searchResults,
  courseBook,
  filter,
  user,
  tableList,
  tagList,
  courseEditor,
  notification,
  ui,
};

// This file exports a mere object, which is to be combined at src/index.js later.
export default reducer;
