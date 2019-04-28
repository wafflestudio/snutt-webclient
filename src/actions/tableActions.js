import {
  ADD_LECTURE_OK,
  DELETE_LECTURE_OK,
  UPDATE_TITLE_OK,
  UPDATE_LECTURE_OK,
  CREATE_TABLE_OK,
  DELETE_TABLE_OK,
  SWITCH_TABLE_OK,
  CREATE_COURSE,
  EDIT_COURSE,
  CLOSE_COURSE,
} from 'actions/actionTypes';

import * as api from 'api';
import { findViewTableIdForSemester } from 'actions/loadingActions';
import err from 'utils/errorHandler';

export const createCourse = () => ({ type: CREATE_COURSE, course: {} });

export const addLecture = lecture => async (dispatch, getState) => {
  const { viewTableId } = getState().tableList;
  if (!viewTableId) {
    alert('강의를 추가할 시간표가 없습니다. 시간표를 추가해주세요.');
    return;
  }
  const _id = lecture._id || '';
  const response = await err(api.addLecture(viewTableId, _id));

  !response.error && dispatch({ type: ADD_LECTURE_OK, response });
};

export const addCustomLecture = lecture => async (dispatch, getState) => {
  const { viewTableId } = getState().tableList;
  if (!viewTableId) {
    alert('강의를 추가할 시간표가 없습니다. 시간표를 추가해주세요.');
    return;
  }
  const response = await err(api.addCustomLecture(viewTableId, lecture));

  !response.error && dispatch({ type: ADD_LECTURE_OK, response });
};

export const deleteLecture = lectureId => async (dispatch, getState) => {
  const { viewTableId } = getState().tableList;
  const response = await err(api.deleteLecture(viewTableId, lectureId));

  !response.error && dispatch({ type: DELETE_LECTURE_OK, response });
};

export const updateLecture = (lectureId, updatedPart) => async (
  dispatch,
  getState,
) => {
  const { viewTableId } = getState().tableList;
  const response = await err(
    api.updateLecture(viewTableId, lectureId, updatedPart),
  );

  !response.error && dispatch({ type: UPDATE_LECTURE_OK, response });
};

export const editCourse = course => ({ type: EDIT_COURSE, course });
export const closeCourse = course => ({ type: CLOSE_COURSE });

export const updateTitle = newTitle => async (dispatch, getState) => {
  const { viewTableId } = getState().tableList;
  const response = await err(api.updateTableTitle(viewTableId, newTitle));

  !response.error && dispatch({ type: UPDATE_TITLE_OK, response });
};

export const createTable = (newTitle = '나의 시간표', year, semester) => async (
  dispatch,
  getState,
) => {
  const currentBook = getState().courseBook.get('current');
  if (!year || !semester) {
    year = currentBook.year;
    semester = currentBook.semester;
  }
  const resp = await err(api.postNewTable(year, semester, newTitle));

  !resp.error && dispatch({ type: CREATE_TABLE_OK, tableList: resp });
};

export const deleteTable = _id => async (dispatch, getState) => {
  const tableList = await err(api.deleteTableById(_id));
  if (tableList.error) return;

  // check if current table is remaining
  const { year, semester } = getState().courseBook.get('current');
  const nextViewTableId = findViewTableIdForSemester(year, semester, tableList);

  dispatch({ type: SWITCH_TABLE_OK, response: { _id: nextViewTableId } });
  dispatch({ type: DELETE_TABLE_OK, tableList });
};

export const switchTable = _id => async dispatch => {
  const response = await err(api.getTable(_id));

  !response.error && dispatch({ type: SWITCH_TABLE_OK, response });
};
