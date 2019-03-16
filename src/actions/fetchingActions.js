import 'whatwg-fetch';

import * as types from './actionTypes';

// Set of actions that should be along with new coursebook
export const changeCoursebook = newCourseBook => ({
  type: types.CHANGE_COURSEBOOK,
  newCourseBook,
});
