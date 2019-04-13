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
} from './actionTypes';

import * as api from '../api';
import { findViewTableIdForSemester } from './loadingActions';

export const createCourse = () => ({ type: CREATE_COURSE, course: {} });

export const addLecture = lecture => async (dispatch, getState) => {
  const { viewTableId } = getState().tableList;
  if (!viewTableId) {
    alert('강의를 추가할 시간표가 없습니다. 시간표를 추가해주세요.');
    return;
  }
  const _id = lecture._id || '';
  const response = await api.addLecture(viewTableId, _id);
  dispatch({ type: ADD_LECTURE_OK, response });
};

export const addCustomLecture = lecture => async (dispatch, getState) => {
  const { viewTableId } = getState().tableList;
  if (!viewTableId) {
    alert('강의를 추가할 시간표가 없습니다. 시간표를 추가해주세요.');
    return;
  }
  const response = await api.addCustomLecture(viewTableId, lecture);
  dispatch({ type: ADD_LECTURE_OK, response });
};

export const deleteLecture = lectureId => async (dispatch, getState) => {
  const { viewTableId } = getState().tableList;
  const response = await api.deleteLecture(viewTableId, lectureId);
  dispatch({ type: DELETE_LECTURE_OK, response });
};

export const updateLecture = (lectureId, updatedPart) => async (
  dispatch,
  getState,
) => {
  const { viewTableId } = getState().tableList;
  const response = await api.updateLecture(viewTableId, lectureId, updatedPart);
  dispatch({ type: UPDATE_LECTURE_OK, response });
};

export const editCourse = course => ({ type: EDIT_COURSE, course });
export const closeCourse = course => ({ type: CLOSE_COURSE });

export const updateTitle = newTitle => async (dispatch, getState) => {
  const { viewTableId } = getState().tableList;
  const response = await api.updateTableTitle(viewTableId, newTitle);
  dispatch({ type: UPDATE_TITLE_OK, response });
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
  const tableList = await api.postNewTable(year, semester, newTitle);
  dispatch({ type: CREATE_TABLE_OK, tableList });
};

export const deleteTable = _id => async (dispatch, getState) => {
  const tableList = await api.deleteTableById(_id);
  // check if current table is remaining
  const { year, semester } = getState().courseBook.get('current');
  const nextViewTableId = findViewTableIdForSemester(year, semester, tableList);

  dispatch({ type: SWITCH_TABLE_OK, response: { _id: nextViewTableId } });
  dispatch({ type: DELETE_TABLE_OK, tableList });
};

export const switchTable = _id => async dispatch => {
  const response = await api.getTable(_id);
  dispatch({ type: SWITCH_TABLE_OK, response });
};
