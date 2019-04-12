import {
  getColorPalette,
  getCoursebooks,
  getTemporaryToken,
  getUserInfo,
  getTableList,
  getNotiCount,
  postNewTable,
} from '../api';
import { switchTable } from './tableActions';
import { getToken, saveToken } from '../utils/auth';
import * as types from './actionTypes';

/**
 * Entry point of all fetching actions
 * Load list of coursebook, tags, and color palettes.
 * Then invoke loading timetables of user
 */
export const initialize = () => async dispatch => {
  const [colors, courseBooks] = await Promise.all([
    getColorPalette(),
    getCoursebooks(),
  ]);
  const recentCourseBook = courseBooks[0];
  dispatch({ type: types.CHANGE_COURSEBOOK, newCourseBook: recentCourseBook });
  dispatch({
    type: types.LOAD_OK,
    colors,
    courseBooks,
  });

  dispatch(fetchUserInfo());
};

export const fetchUserInfo = () => async (dispatch, getState) => {
  // Find existing token or get new token
  let token = getToken();
  token && console.log(`found existing token ${token}`);
  if (!token || token === 'undefined') {
    console.log('issuing new temp token');
    token = await getTemporaryToken();
    saveToken(token);
  }

  // Fetch user info and saved tables
  let [userInfo, tableList, notiCount] = await Promise.all([
    getUserInfo(),
    getTableList(),
    getNotiCount(),
  ]);

  // set viewTableId
  const { year, semester } = getState().courseBook.toJS().current;
  let viewTableId = findViewTableIdForSemester(year, semester, tableList);

  if (!viewTableId) {
    tableList = await postNewTable(year, semester, '나의 시간표');
    viewTableId = findViewTableIdForSemester(year, semester, tableList);
  }

  dispatch({ type: types.LOGIN_OK, userInfo });
  dispatch({ type: types.GET_TABLELIST, tableList });
  dispatch(switchTable(viewTableId));
  dispatch({
    type: types.UPDATE_NEW_MESSAGE_COUNT,
    count: notiCount.count,
  });
};

// Set of actions that should be along with new coursebook
export const changeCoursebook = newCourseBook => async (dispatch, getState) => {
  dispatch({
    type: types.CHANGE_COURSEBOOK,
    newCourseBook,
  });
  const { user, tableList } = getState();
  if (!user.id) return;
  const { year, semester } = newCourseBook;
  let newViewTableId = findViewTableIdForSemester(
    year,
    semester,
    Object.values(tableList.tableMap),
  );

  // If table for new semester do not exists, create new one
  if (!newViewTableId) {
    const newTableList = await postNewTable(year, semester, '나의 시간표');
    dispatch({ type: types.CREATE_TABLE_OK, tableList: newTableList });
    newViewTableId = findViewTableIdForSemester(year, semester, newTableList);
  }

  dispatch(switchTable(newViewTableId));
};

/**
 * Helper
 */
export const findViewTableIdForSemester = (year, semester, tableList) => {
  const tablesForSemester = tableList.filter(
    t => t.year === year && t.semester === semester,
  );
  if (tablesForSemester.length > 0) {
    return tablesForSemester[0]._id;
  }
  return null;
};
