import { createAction } from 'typesafe-actions';

import { Lecture } from 'types';

/**
 * Action creators
 */
export const createNewCourse = createAction('@courseEditor/new', action => () =>
  action({}),
);

export const editCourse = createAction(
  '@courseEditor/open',
  action => (lecture: Lecture) => action({ lecture }),
);

export const closeCourse = createAction('@courseEditor/close', action => () =>
  action({}),
);

export type CourseEditorActionTypes =
  | ReturnType<typeof createNewCourse>
  | ReturnType<typeof editCourse>
  | ReturnType<typeof closeCourse>;
