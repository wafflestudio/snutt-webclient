import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ADD_LECTURE_OK, UPDATE_LECTURE_OK } from 'actions/actionTypes';
import { Lecture } from '../types';

interface CourseEditorState {
  isOpen: boolean;
  course: Lecture | null;
}

const initialState: CourseEditorState = {
  isOpen: false,
  course: null,
};

const closeCourseReducer = state => {
  state.isOpen = false;
  state.course = null;
};

const courseEditorSlice = createSlice({
  name: 'courseEditor',
  initialState,
  reducers: {
    startCourseEditor: (state, action: PayloadAction<Lecture>) => {
      state.isOpen = true;
      state.course = action.payload;
    },
    closeCourseEditor: closeCourseReducer,
  },
  extraReducers: {
    [UPDATE_LECTURE_OK]: closeCourseReducer,
    [ADD_LECTURE_OK]: closeCourseReducer,
  },
});

export const {
  startCourseEditor,
  closeCourseEditor,
} = courseEditorSlice.actions;

export default courseEditorSlice.reducer;
