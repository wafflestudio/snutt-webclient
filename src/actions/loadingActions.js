import {
  getColorPalette,
  getCoursebooks,
  getTemporaryToken,
  getUserInfo,
  getTableList,
  getRecentTable,
  getNotiCount,
} from '../api';
import { getToken, saveToken } from '../utils/auth';
import * as types from './actionTypes';

/**
 * Load list of coursebook, tags, and color palettes.
 * Then invoke loading timetables of user
 */
export const initialize = () => async dispatch => {
  const [colors, courseBooks] = await Promise.all([
    getColorPalette(),
    getCoursebooks(),
  ]);
  const recentCourseBook = courseBooks[0];
  dispatch({
    type: types.LOAD_OK,
    colors,
    courseBooks,
    recentCourseBook,
  });

  // Find existing token or get new token
  let token = getToken();
  if (!token) {
    token = await getTemporaryToken();
    saveToken(token);
  }
};

export const fetchUserInfo = token => async dispatch => {
  // Fetch user info and saved tables
  const [userInfo, tableList, recentTable, notiCount] = await Promise.all([
    getUserInfo(),
    getTableList(),
    getRecentTable(),
    getNotiCount(),
  ]);
  dispatch({ type: types.LOGIN_OK, userInfo });
  dispatch({ type: types.GET_TABLELIST, tableList });
  dispatch({
    type: types.UPDATE_NEW_MESSAGE_COUNT,
    count: notiCount.count,
  });
};
