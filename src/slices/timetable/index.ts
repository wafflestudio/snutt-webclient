import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Timetable, LectureColor } from 'types';
import * as types from 'actions/actionTypes';

interface TimetableState {
  viewTableId: string | null;
  tableMap: { [key: string]: Timetable };
  colorScheme: LectureColor[];
}

const initialState: TimetableState = {
  viewTableId: null,
  tableMap: {},
  colorScheme: [],
};

const timetableSlice = createSlice({
  name: 'timetable',
  initialState,
  reducers: {
    updateTableList(state, action: PayloadAction<Timetable[]>) {
      const { tableMap } = state;
      const updatedTables = action.payload;
      const newTableMap = { ...tableMap };
      updatedTables.forEach(t => {
        newTableMap[t._id] = {
          ...tableMap[t._id],
          ...t,
        };
      });
      state.tableMap = newTableMap;
    },
    updateTable(state, action: PayloadAction<Timetable>) {
      const updatedTable = action.payload;
      const existingTable = state.tableMap[updatedTable._id];
      if (existingTable) {
        state.tableMap[updatedTable._id] = {
          ...existingTable,
          ...updatedTable,
        };
      }
    },
    loadColor(state, action: PayloadAction<LectureColor[]>) {
      state.colorScheme = action.payload;
    },
    updateViewTable(state, action: PayloadAction<Timetable>) {
      const newViewTableId = action.payload._id;
      state.tableMap[newViewTableId] = {
        ...state.tableMap[newViewTableId],
        ...action.payload,
      };
      state.viewTableId = newViewTableId;
    },
    switchViewTable(state, action: PayloadAction<string>) {
      if (state.tableMap[action.payload]) {
        state.viewTableId = action.payload;
      } else {
        state.viewTableId = null;
      }
    },
  },
  extraReducers: {
    [types.LOAD_OK]: (state, action: any) => {
      state.colorScheme = action.colors;
    },
  },
});

export const {
  updateTable,
  updateTableList,
  loadColor,
  updateViewTable,
  switchViewTable,
} = timetableSlice.actions;

export default timetableSlice.reducer;

export * from './actions';
