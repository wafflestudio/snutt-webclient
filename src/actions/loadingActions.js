import {
  getColorPalette,
  getCoursebooks,
  getTemporaryToken,
  getUserInfo,
  getTableList,
  getNewMessageCount,
  getTags,
  postNewTable,
} from 'api';
import * as types from 'actions/actionTypes';
import {updateTableList, switchTable} from 'slices/timetable'
import {checkNewMessage} from 'slices/notification'
import {changeCoursebook as changeCoursebookAction} from 'slices/coursebook'
import { loginSuccess } from 'slices/user'
import {setTagList} from 'slices/search'
import { getToken, saveToken } from 'utils/auth';
import err from 'utils/errorHandler';

/**
 * Entry point of all fetching actions
 * Load list of coursebook, tags, and color palettes.
 * Then invoke loading timetables of user
 */
export const initialize = () => async dispatch => {
  const resp = await err(Promise.all([getColorPalette(), getCoursebooks()]));
  if (resp.error) return;

  const [colors, courseBooks] = resp;

  const recentCourseBook = courseBooks[0];
  dispatch(changeCoursebookAction(recentCourseBook))
  dispatch({
    type: types.LOAD_OK,
    colors,
    courseBooks,
  });

  dispatch(fetchUserInfo());
  const tags = await getTags(recentCourseBook.year, recentCourseBook.semester);
  dispatch(setTagList(tags))
};

export const fetchUserInfo = () => async (dispatch, getState) => {
  try {
    // Find existing token or get new token
    let token = getToken();
    token && console.log(`found existing token ${token}`);
    if (!token || token === 'undefined') {
      console.log('issuing new temp token');
      const resp = await getTemporaryToken();
      resp.token && saveToken(resp.token);
    }

    // Fetch user info and saved tables
    let [userInfo, tableList, notiCount] = await Promise.all([
      getUserInfo(),
      getTableList(),
      getNewMessageCount(),
    ]);

    // set viewTableId
    const { year, semester } = getState().courseBook.current;
    let viewTableId = findViewTableIdForSemester(year, semester, tableList);

    if (!viewTableId) {
      tableList = await postNewTable(year, semester, '나의 시간표');
      viewTableId = findViewTableIdForSemester(year, semester, tableList);
    }

    dispatch(loginSuccess({info: userInfo}))
    dispatch(updateTableList(tableList))
    dispatch(switchTable(viewTableId))
    dispatch(checkNewMessage({ hasNew: notiCount.count > 0 }))
  } catch (e) {
    alert('초기화 중 에러가 발생했습니다');
    console.log(e);
  }
};

// Set of actions that should be along with new coursebook
export const changeCoursebook = newCourseBook => async (dispatch, getState) => {
  dispatch(changeCoursebookAction(newCourseBook));
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
    const newTableList = await err(postNewTable(year, semester, '나의 시간표'));
    if (!newTableList.error) {
      dispatch(updateTableList(newTableList))
      newViewTableId = findViewTableIdForSemester(year, semester, newTableList);
    }
  }

  dispatch(switchTable(newViewTableId));
  const tags = await getTags(year, semester);
  dispatch(setTagList(tags))
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
