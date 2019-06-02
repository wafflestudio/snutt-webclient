import { createAction } from 'typesafe-actions';
import { CourseBook } from 'types';

/**
 * Action creators
 */
export const loadCourseBook = createAction(
  '@courseBook/load',
  action => (courseBooks: CourseBook[]) => action({ courseBooks }),
);

export const changeCourseBook = createAction(
  '@courseBook/change',
  action => (courseBook: CourseBook) => {
    return action({ courseBook });
  },
);

export type courseBookActionTypes =
  | ReturnType<typeof loadCourseBook>
  | ReturnType<typeof changeCourseBook>;
