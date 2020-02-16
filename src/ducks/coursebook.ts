import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as actionTypes from '../actions/actionTypes';
import { CourseBook } from '../types';

interface CoursebookState {
  available: CourseBook[];
  current: CourseBook | null;
}

const initialState: CoursebookState = {
  available: [],
  current: null,
};

const coursebookSlice = createSlice({
  name: 'coursebook',
  initialState,
  reducers: {
    loadCoursebooks(state, action: PayloadAction<CourseBook[]>) {
      state.available = action.payload;
    },
    changeCoursebook(state, action: PayloadAction<CourseBook>) {
      state.current = action.payload;
    },
  },
  extraReducers: {
    [actionTypes.LOAD_OK]: (state, action) => {
      if (action.courseBooks) {
        state.available = action.courseBooks;
      }
    },
  },
});

export const { loadCoursebooks, changeCoursebook } = coursebookSlice.actions;

export default coursebookSlice.reducer;
