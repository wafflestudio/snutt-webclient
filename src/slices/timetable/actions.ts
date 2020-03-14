import * as api from 'api';
import { AppThunk } from 'slices';
import {
  updateViewTable,
  switchViewTable,
  updateTable,
  updateTableList,
} from './index';
import { findViewTableIdForSemester } from 'actions/loadingActions';
import err from 'utils/errorHandler';

export const addLecture = (lecture): AppThunk => async (dispatch, getState) => {
  const { viewTableId } = getState().tableList;
  if (!viewTableId) {
    alert('강의를 추가할 시간표가 없습니다. 시간표를 추가해주세요.');
    return;
  }
  const _id = lecture._id || '';
  const response = await err(api.addLecture(viewTableId, _id));

  !response.error && dispatch(updateTable(response));
};

export const addCustomLecture = (lecture): AppThunk => async (
  dispatch,
  getState,
) => {
  const { viewTableId } = getState().tableList;
  if (!viewTableId) {
    alert('강의를 추가할 시간표가 없습니다. 시간표를 추가해주세요.');
    return;
  }
  const response = await err(api.addCustomLecture(viewTableId, lecture));

  !response.error && dispatch(updateTable(response));
};

export const deleteLecture = (lectureId): AppThunk => async (
  dispatch,
  getState,
) => {
  const { viewTableId } = getState().tableList;
  if (!viewTableId) return;

  const response = await err(api.deleteLecture(viewTableId, lectureId));

  !response.error && dispatch(updateTable(response));
};

export const updateLecture = (lectureId, updatedPart): AppThunk => async (
  dispatch,
  getState,
) => {
  const { viewTableId } = getState().tableList;
  if (!viewTableId) return;

  const response = await err(
    api.updateLecture(viewTableId, lectureId, updatedPart),
  );

  !response.error && dispatch(updateTable(response));
};

export const updateTitle = (newTitle): AppThunk => async (
  dispatch,
  getState,
) => {
  const { viewTableId } = getState().tableList;
  if (!viewTableId) return;

  const response = await err(api.updateTableTitle(viewTableId, newTitle));

  !response.error && dispatch(updateTableList(response));
};

export const createTable = (newTitle = '나의 시간표'): AppThunk => async (
  dispatch,
  getState,
) => {
  const currentBook = getState().courseBook.current;
  if (!currentBook) return;
  const { year, semester } = currentBook;

  const resp = await err(api.postNewTable(year, semester, newTitle));
  !resp.error && dispatch(updateTableList(resp));
};

export const deleteTable = (_id): AppThunk => async (dispatch, getState) => {
  const tableList = await err(api.deleteTableById(_id));
  if (tableList.error) return;

  // check if current table is remaining
  if (!tableList.find(t => t._id === _id)) {
    const currentBook = getState().courseBook.current;
    if (!currentBook) return;
    const { year, semester } = currentBook;
    const nextViewTableId = findViewTableIdForSemester(
      year,
      semester,
      tableList,
    );
    dispatch(switchViewTable(nextViewTableId));
  }
  dispatch(updateTableList(tableList));
};

export const switchTable = _id => async dispatch => {
  const response = await err(api.getTable(_id));

  !response.error && dispatch(updateViewTable(response));
};
