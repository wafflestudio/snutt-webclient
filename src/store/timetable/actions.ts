import { createAction } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import { AppState } from '../index';
import * as api from 'api';
import { Lecture, Timetable, AbstractTimetable, LectureColor } from 'types';
import { findViewTableIdForSemester } from './utils';

/**
 * Action creators
 */
export const createCourse = createAction('@table/createCourse', action => () =>
  action({}),
);

export const updateTimetable = createAction(
  '@table/updateTimetable',
  action => (table: Timetable) => action({ table }),
);

export const updateTimetableList = createAction(
  '@table/updateTimetableList',
  action => (tableList: AbstractTimetable[]) =>
    action({
      tableList,
    }),
);

export const updateColorScheme = createAction(
  '@table/updateColorScheme',
  action => (colorScheme: LectureColor[]) => action({ colorScheme }),
);

export const updateViewTable = createAction(
  '@table/updateViewTable',
  action => (table: Timetable) => action({ table }),
);

export type TimetableActionTypes =
  | ReturnType<typeof createCourse>
  | ReturnType<typeof updateTimetable>
  | ReturnType<typeof updateTimetableList>
  | ReturnType<typeof updateColorScheme>
  | ReturnType<typeof updateViewTable>;

/**
 * Thunk actions
 */

export const addLecture = (
  lecture: Lecture,
): ThunkAction<void, AppState, null, Action> => async (dispatch, getState) => {
  const { viewTableId } = getState().tableList;
  if (!viewTableId) {
    alert('강의를 추가할 시간표가 없습니다. 시간표를 추가해주세요.');
    return;
  }
  const _id = lecture._id;
  if (_id) {
    const response = await api.addLecture(viewTableId, _id);
    dispatch(updateTimetable(response));
  }
};

export const addCustomLecture = (
  lecture: Lecture,
): ThunkAction<void, AppState, null, Action> => async (dispatch, getState) => {
  const { viewTableId } = getState().tableList;
  if (!viewTableId) {
    alert('강의를 추가할 시간표가 없습니다. 시간표를 추가해주세요.');
    return;
  }
  const response = await api.addCustomLecture(viewTableId, lecture);
  dispatch(updateTimetable(response));
};

export const deleteLecture = (
  lectureId: string,
): ThunkAction<void, AppState, null, Action> => async (dispatch, getState) => {
  const { viewTableId } = getState().tableList;
  const response =
    viewTableId && (await api.deleteLecture(viewTableId, lectureId));

  response && dispatch(updateTimetable(response));
};

export const updateLecture = (
  lectureId: string,
  updatedPart: Partial<Lecture>,
): ThunkAction<void, AppState, null, Action> => async (dispatch, getState) => {
  const { viewTableId } = getState().tableList;
  const response =
    viewTableId &&
    (await api.updateLecture(viewTableId, lectureId, updatedPart));

  response && dispatch(updateTimetable(response));
};

export const updateTitle = (
  newTitle: string,
): ThunkAction<void, AppState, null, Action> => async (dispatch, getState) => {
  const { viewTableId } = getState().tableList;
  const response =
    viewTableId && (await api.updateTableTitle(viewTableId, newTitle));

  response && dispatch(updateTimetableList(response));
};

export const createTable = (
  newTitle: string = '나의 시간표',
  year: number,
  semester: number,
): ThunkAction<void, AppState, null, Action> => async (dispatch, getState) => {
  const currentBook = getState().courseBook.current;
  if (!currentBook) return;
  const { year, semester } = currentBook;

  const resp = await api.postNewTable(year, semester, newTitle);
  resp && dispatch(updateTimetableList(resp));
};

export const deleteTable = (
  _id: string,
): ThunkAction<void, AppState, null, Action> => async (dispatch, getState) => {
  const currentBook = getState().courseBook.current;
  if (!currentBook) return;
  const { year, semester } = currentBook;

  const tableList = await api.deleteTableById(_id);
  // find another table to show
  const nextViewTableId = findViewTableIdForSemester(year, semester, tableList);
  nextViewTableId && dispatch(switchTable(nextViewTableId));
  dispatch(updateTimetableList(tableList));
};

export const switchTable = (
  tableId: string,
): ThunkAction<void, AppState, null, Action> => async dispatch => {
  const table = await api.getTable(tableId);
  table && dispatch(updateViewTable(table));
};
