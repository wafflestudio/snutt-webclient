import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateTable } from 'slices/timetable';
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
    [updateTable.type]: closeCourseReducer,
  },
});

export const {
  startCourseEditor,
  closeCourseEditor,
} = courseEditorSlice.actions;

export default courseEditorSlice.reducer;
