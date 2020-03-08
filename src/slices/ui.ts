import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { changeCoursebook } from 'slices/coursebook';
import { Lecture } from 'types';

import * as actionTypes from '../actions/actionTypes';

interface UIState {
  hoveredCourse: Lecture | null;
  tableHoveredCourse: Lecture | null;
  isQuerying: boolean;
  isLeftTabSearching: boolean;
}

const initialState: UIState = {
  hoveredCourse: null,
  tableHoveredCourse: null,
  isQuerying: false,
  isLeftTabSearching: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    hoverCourseAtList(state, action: PayloadAction<Lecture>) {
      state.hoveredCourse = action.payload;
    },
    unhoverCourseAtList(state) {
      state.hoveredCourse = null;
    },
    hoverCourseAtTable(state, action: PayloadAction<Lecture>) {
      state.tableHoveredCourse = action.payload;
    },
    unhoverCourseAtTable(state) {
      state.tableHoveredCourse = null;
    },
    setIsLeftTabSearching(state, action: PayloadAction<boolean>) {
      state.isLeftTabSearching = action.payload;
    },
  },
  extraReducers: {
    [changeCoursebook.type]: state => {
      state.isLeftTabSearching = false;
    },
    [actionTypes.START_QUERY]: state => {
      state.isQuerying = true;
      state.isLeftTabSearching = true;
    },
    [actionTypes.SHOW_RESULT]: state => {
      state.isQuerying = false;
      state.isLeftTabSearching = true;
    },
  },
});

export const {
  hoverCourseAtList,
  unhoverCourseAtList,
  hoverCourseAtTable,
  unhoverCourseAtTable,
  setIsLeftTabSearching,
} = uiSlice.actions;

export default uiSlice.reducer;
