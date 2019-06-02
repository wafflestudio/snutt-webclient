import { Reducer } from 'redux';
import { getType } from 'typesafe-actions';

import { Lecture } from 'types';
import * as actions from './actions';

interface CourseEditorState {
  isOpen: boolean;
  course: Partial<Lecture> | null;
}

const initialState: CourseEditorState = {
  isOpen: false,
  course: null,
};

export const courseEditorReducer: Reducer<
  CourseEditorState,
  actions.CourseEditorActionTypes
> = (state = initialState, action) => {
  switch (action.type) {
    case getType(actions.createNewCourse): {
      return {
        isOpen: true,
        course: null,
      };
    }
    case getType(actions.editCourse): {
      return {
        isOpen: true,
        course: action.payload.lecture,
      };
    }
    case getType(actions.closeCourse):
      return initialState;
    default:
      return state;
  }
};