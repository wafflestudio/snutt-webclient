import { CALL_API } from '../middleware/api';
import {
  ADD_LECTURE_START,
  ADD_LECTURE_OK,
  ADD_LECTURE_FAIL,
  DELETE_LECTURE_START,
  DELETE_LECTURE_OK,
  DELETE_LECTURE_FAIL,
  UPDATE_TITLE_START,
  UPDATE_TITLE_OK,
  UPDATE_TITLE_FAIL,
  UPDATE_LECTURE_START,
  UPDATE_LECTURE_OK,
  UPDATE_LECTURE_FAIL,
  CREATE_TABLE_OK,
  DELETE_TABLE_OK,
  SWITCH_TABLE_START,
  SWITCH_TABLE_OK,
  SWITCH_TABLE_FAIL,
  CREATE_COURSE,
  EDIT_COURSE,
  CLOSE_COURSE,
} from './actionTypes';

import { postNewTable, deleteTableById } from '../api';
import { findViewTableIdForSemester } from './loadingActions';

export const createCourse = () => ({ type: CREATE_COURSE, course: {} });

export function addLecture(lecture) {
  return function(dispatch, getState) {
    const { viewTableId } = getState().tableList;
    if (!viewTableId) {
      alert('강의를 추가할 시간표가 없습니다. 시간표를 추가해주세요.');
      return;
    }
    const _id = lecture._id || '';
    dispatch({
      [CALL_API]: {
        endpoint: `tables/${viewTableId}/lecture/${_id}`,
        config: {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
        },
        authenticated: true,
        types: [ADD_LECTURE_START, ADD_LECTURE_OK, ADD_LECTURE_FAIL],
      },
    });
  };
}

export function addCustomLecture(lecture) {
  return function(dispatch, getState) {
    const { viewTableId } = getState().tableList || 0;
    if (!viewTableId) {
      alert('강의를 추가할 시간표가 없습니다. 시간표를 추가해주세요.');
      return;
    }
    dispatch({
      [CALL_API]: {
        endpoint: `tables/${viewTableId}/lecture`,
        config: {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lecture),
        },
        authenticated: true,
        types: [ADD_LECTURE_START, ADD_LECTURE_OK, ADD_LECTURE_FAIL],
      },
    });
  };
}

// TODO: Change name to deleteCourse
export function deleteLecture(lectureId) {
  return function(dispatch, getState) {
    const { viewTableId } = getState().tableList;
    dispatch({
      [CALL_API]: {
        endpoint: `tables/${viewTableId}/lecture/${lectureId}`,
        config: {
          method: 'delete',
        },
        authenticated: true,
        types: [DELETE_LECTURE_START, DELETE_LECTURE_OK, DELETE_LECTURE_FAIL],
      },
    });
  };
}
export const editCourse = course => ({ type: EDIT_COURSE, course });
export const closeCourse = course => ({ type: CLOSE_COURSE });
export function updateLecture(lectureId, updatedPart) {
  return function(dispatch, getState) {
    const { viewTableId: currentTableId } = getState().tableList;
    dispatch({
      [CALL_API]: {
        endpoint: `tables/${currentTableId}/lecture/${lectureId}`,
        config: {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedPart),
        },
        authenticated: true,
        types: [UPDATE_LECTURE_START, UPDATE_LECTURE_OK, UPDATE_LECTURE_FAIL],
      },
    });
  };
}

export function updateTitle(newTitle) {
  return function(dispatch, getState) {
    const { viewTableId } = getState().tableList;
    dispatch({
      [CALL_API]: {
        endpoint: `tables/${viewTableId}/`,
        config: {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: newTitle }),
        },
        authenticated: true,
        types: [UPDATE_TITLE_START, UPDATE_TITLE_OK, UPDATE_TITLE_FAIL],
      },
    });
  };
}

export const createTable = (newTitle = '나의 시간표', year, semester) => async (
  dispatch,
  getState,
) => {
  const currentBook = getState().courseBook.get('current');
  if (!year || !semester) {
    year = currentBook.year;
    semester = currentBook.semester;
  }
  const tableList = await postNewTable(year, semester, newTitle);
  dispatch({ type: CREATE_TABLE_OK, tableList });
};

export const deleteTable = _id => async (dispatch, getState) => {
  const tableList = await deleteTableById(_id);
  // check if current table is remaining
  const { year, semester } = getState().courseBook.get('current');
  const nextViewTableId = findViewTableIdForSemester(year, semester, tableList);

  dispatch({ type: SWITCH_TABLE_OK, response: { _id: nextViewTableId } });
  dispatch({ type: DELETE_TABLE_OK, tableList });
};

export function switchTable(_id) {
  if (!_id) {
    return function(dispatch) {
      dispatch({ type: SWITCH_TABLE_START, payload: { tableId: null } });
    };
  }
  return function(dispatch) {
    dispatch({
      [CALL_API]: {
        endpoint: `tables/${_id}`,
        config: {
          method: 'get',
        },
        authenticated: true,
        types: [SWITCH_TABLE_START, SWITCH_TABLE_OK, SWITCH_TABLE_FAIL],
        payload: { tableId: _id },
      },
    });
  };
}
