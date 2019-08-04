import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import {
  getColorPalette,
  getCoursebooks,
  getTemporaryToken,
  getUserInfo,
  getTableList,
  getNewMessageCount,
  postNewTable,
  getTags,
} from 'api';
import { AbstractTimetable, CourseBook } from 'types';

import { AppState } from 'store';
import {
  switchTable,
  updateTimetableList,
  updateColorScheme,
} from 'store/timetable/actions';
import { checkNewMessages } from 'store/notification/actions';
import { loadCourseBook, changeCourseBook } from 'store/courseBook/actions';
import { login } from 'store/user/actions';
import { setTags } from 'store/search/actions';
import { getToken, saveToken } from 'utils/auth';
import err from 'utils/errorHandler';

/**
 * Entry point of all fetching actions
 * Load list of coursebook, tags, and color palettes.
 * Then invoke loading timetables of user
 */
export const initialize = (): ThunkAction<
  void,
  AppState,
  null,
  Action
> => async dispatch => {
  const resp = await Promise.all([getColorPalette(), getCoursebooks()]);
  const [colors, courseBooks] = resp;

  const recentCourseBook = courseBooks[0];
  dispatch(changeCourseBook(recentCourseBook));
  dispatch(loadCourseBook(courseBooks));
  dispatch(updateColorScheme(colors));
  dispatch(fetchUserInfo());
  const tagLists = await getTags(
    recentCourseBook.year,
    recentCourseBook.semester,
  );
  dispatch(setTags(tagLists));
};

export const fetchUserInfo = (): ThunkAction<
  void,
  AppState,
  null,
  Action
> => async (dispatch, getState) => {
  try {
    // Find existing token or get new token
    let token = getToken();
    token && console.debug(`found existing token ${token}`);
    if (!token) {
      console.debug('issuing new temp token');
      const resp = await getTemporaryToken();
      if ('token' in resp) resp.token && saveToken(resp.token);
    }

    // Fetch user info and saved tables
    let [userInfo, tableList, notiCount] = await Promise.all([
      getUserInfo(),
      getTableList(),
      getNewMessageCount(),
    ]);

    // set viewTableId
    const currentCoursebook = getState().courseBook.current;
    if (!currentCoursebook) return;
    const { year, semester } = currentCoursebook;
    let viewTableId = findViewTableIdForSemester(year, semester, tableList);

    if (!viewTableId) {
      tableList = await postNewTable(year, semester, '나의 시간표');
      // Now we can assure that there is at least one viewTable for this semester
      viewTableId = findViewTableIdForSemester(year, semester, tableList);
    }
    dispatch(login(userInfo));
    dispatch(updateTimetableList(tableList));
    dispatch(switchTable(viewTableId as string));
    dispatch(checkNewMessages(notiCount.count));
  } catch (e) {
    alert('초기화 중 에러가 발생했습니다');
    console.log(e);
  }
};

// Set of actions that should be along with new coursebook
export const changeCoursebookAndTimetable = (
  newCourseBook: CourseBook,
): ThunkAction<void, AppState, null, Action> => async (dispatch, getState) => {
  dispatch(changeCourseBook(newCourseBook));
  const { user, tableList } = getState();
  if (!user.user) return;
  const { year, semester } = newCourseBook;
  let newViewTableId = findViewTableIdForSemester(
    year,
    semester,
    Object.values(tableList.tableMap),
  );

  if (!newViewTableId) {
    const newTableList = await err(postNewTable(year, semester, '나의 시간표'));
    if (!newTableList.error) {
      dispatch(updateTimetableList(newTableList));
      newViewTableId = findViewTableIdForSemester(year, semester, newTableList);
    }
  }
  dispatch(switchTable(newViewTableId as string));
  const tagLists = await getTags(year, semester);
  dispatch(setTags(tagLists));
};

/**
 * Helper
 */
export const findViewTableIdForSemester = (
  year: number,
  semester: number,
  tableList: AbstractTimetable[],
) => {
  const tablesForSemester = tableList.filter(
    t => t.year === year && t.semester === semester,
  );
  if (tablesForSemester.length > 0) {
    return tablesForSemester[0]._id;
  }
  return null;
};
