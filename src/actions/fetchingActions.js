import 'whatwg-fetch';

import * as types from './actionTypes';
import { CALL_API } from '../middleware/api';
import { FETCH_TAG, GET_TAG, FAIL_TAG } from './actionTypes';
import { baseUrl, apiKey } from '../samples/sampleKey';
import { fetchTableList } from './tableActions';
import { loginWithToken } from './userActions';
import request from './request';

function getColor(colorName) {
  return {
    [CALL_API]: {
      endpoint: `colors/${colorName}`,
      config: { method: 'get' },
      types: [types.GET_COLOR_START, types.GET_COLOR_OK, types.GET_COLOR_FAIL],
    },
  };
}

// Entry point of all fetching actions
export function updateCoursebook() {
  return function (dispatch) {
    dispatch(getColor('vivid_ios'));
    request('course_books', {
      method: 'get',
    })
    .then(json => dispatch(fetchCoursebook(json)));
  };
}

// Not sure whether dispatching multiple actions at once is good practice...
export function fetchCoursebook(courseBooks) {
  return function (dispatch) {
    const recentBook = courseBooks[0];
    dispatch(changeCoursebook(recentBook));
    dispatch({ type: types.FETCH_COURSEBOOK, courseBooks }); // update coursebook state
  };
}

// Set of actions that should be along with new coursebook
export function changeCoursebook(newCourseBook) {
  return function (dispatch, getState) {
    const { year: newYear, semester: newSemester } = newCourseBook;
    dispatch({ type: types.CHANGE_COURSEBOOK, newCourseBook });
    dispatch({ type: types.SET_LEFT_TAB, searching: false }); // show added lectures
    dispatch({ type: types.SHOW_RESULT, courses: null }); // empty the search results

    if (getState().user.loggedIn) { dispatch(fetchTableList()); } else {
      // If not logged in, check existing token or get temporary one
      loginWithToken(dispatch);
    }
    dispatch(updateTag(newYear, newSemester));
  };
}

export function updateTag(year, semester) {
  return {
    [CALL_API]: {
      endpoint: `tags/${year}/${semester}`,
      config: { method: 'get' },
      types: [FETCH_TAG, GET_TAG, FAIL_TAG],
    },
  };
}
