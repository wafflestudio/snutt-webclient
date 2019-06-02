import { Reducer } from 'redux';
import { getType } from 'typesafe-actions';

import { CourseBook } from 'types';
import * as actions from './actions';

interface CourseBookState {
  available: CourseBook[];
  current: CourseBook | null;
}

const initialState = {
  available: [],
  current: null,
};

export const courseBookReducer: Reducer<
  CourseBookState,
  actions.courseBookActionTypes
> = (state = initialState, action) => {
  switch (action.type) {
    case getType(actions.loadCourseBook): {
      return {
        ...state,
        available: action.payload.courseBooks,
      };
    }
    case getType(actions.changeCourseBook): {
      return {
        ...state,
        current: action.payload.courseBook,
      };
    }
    default:
      return state;
  }
};
