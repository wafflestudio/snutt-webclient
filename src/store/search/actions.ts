import { createAction } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import * as api from 'api';
import {
  Timetable,
  CourseBook,
  Lecture,
  LectureQuery,
  LectureQueryFilter,
  TagList,
  UserLecture,
} from 'types';
import { AppState } from '../index';
import { complement } from 'utils/timemask';
import { create } from 'domain';
import { array } from 'prop-types';

/**
 * Action creators
 */
export const hoverCourse = createAction(
  '@search/hoverCourse',
  action => (course: Lecture) => action({ course }),
);

export const unhoverCourse = createAction(
  '@search/unhoverCourse',
  action => () => action(),
);

export const tableHoverCourse = createAction(
  '@search/tableHoverCourse',
  action => (course: Lecture) => action({ course }),
);

export const tableUnhoverCourse = createAction(
  '@search/tableUnhoverCourse',
  action => () => action(),
);

export const updateQuery = createAction(
  '@search/updateQuery',
  action => (partialQuery: Partial<LectureQuery>) => action({ partialQuery }),
);

export const addQuery = createAction(
  '@search/addQuery',
  action => (field: keyof LectureQueryFilter, value: string | number) =>
    action({ field, value }),
);

export const removeQuery = createAction(
  '@search/removeQuery',
  action => (field: keyof LectureQueryFilter, value: string | number) =>
    action({ field, value }),
);

export const toggleQuery = createAction(
  '@search/toggleQuery',
  action => (field: keyof LectureQueryFilter, value: string | number) =>
    action({ field, value }),
);

export const resetQuery = createAction('@search/resetQuery', action => () =>
  action(),
);

export const startQuery = createAction('@search/startQuery', action => () =>
  action(),
);

export const endQuery = createAction('@search/endQuery', action => () =>
  action(),
);

export const showResult = createAction(
  '@search/showResult',
  action => (courses: Lecture[]) => action({ courses }),
);

export const toggleSearchPanel = createAction(
  '@search/toggleSearchPanel',
  action => (on?: boolean) => action({ on }),
);

export const toggleTimePanel = createAction(
  '@search/toggleTimePanel',
  action => () => action(),
);

export const toggleUseTime = createAction(
  '@search/toggleUseTime',
  action => () => action(),
);

export const selectTimeMode = createAction(
  '@search/toggleTimeMode',
  action => (mode: boolean) => action({ mode }),
);

export const setLeftTab = createAction(
  '@search/setLeftTab',
  action => (searching: boolean) => action({ searching }),
);

export const setTags = createAction(
  '@search/setTags',
  action => (tags: TagList) => action({ tags }),
);

export type searchActionTypes =
  | ReturnType<typeof hoverCourse>
  | ReturnType<typeof unhoverCourse>
  | ReturnType<typeof tableHoverCourse>
  | ReturnType<typeof tableUnhoverCourse>
  | ReturnType<typeof updateQuery>
  | ReturnType<typeof toggleQuery>
  | ReturnType<typeof addQuery>
  | ReturnType<typeof removeQuery>
  | ReturnType<typeof resetQuery>
  | ReturnType<typeof startQuery>
  | ReturnType<typeof endQuery>
  | ReturnType<typeof showResult>
  | ReturnType<typeof toggleSearchPanel>
  | ReturnType<typeof toggleTimePanel>
  | ReturnType<typeof toggleUseTime>
  | ReturnType<typeof selectTimeMode>
  | ReturnType<typeof setLeftTab>
  | ReturnType<typeof setTags>;

/**
 * Thunk actions
 */

export const runQuery = (
  textQuery: string,
): ThunkAction<void, AppState, null, Action> => async (dispatch, getState) => {
  const {
    courseBook,
    search: {
      query: userQuery,
      filter: { useTime, searchEmptySlot },
    },
    tableList: { viewTableId, tableMap },
  } = getState();
  if (!courseBook.current) return;

  const { year, semester } = courseBook.current;
  const currentLectures =
    (viewTableId &&
      tableMap[viewTableId] &&
      (tableMap[viewTableId] as Timetable).lecture_list) ||
    [];

  const courseTimemasks = currentLectures.map(l => l.class_time_mask);
  const timemask = getQueryTimeMask(
    useTime,
    searchEmptySlot,
    courseTimemasks,
    userQuery.time_mask,
  );

  const queryRequest = makeQueryRequest(
    userQuery,
    year,
    semester,
    textQuery,
    timemask,
  );

  dispatch(startQuery());
  const courses = await api.getQueryResults(queryRequest);
  courses && dispatch(showResult(courses));
  dispatch(endQuery());
  dispatch(setLeftTab(true));
  dispatch(toggleSearchPanel(false));
};

export const makeQueryRequest = (
  userQuery: LectureQuery,
  year: number,
  semester: number,
  textQuery: string,
  time_mask: number[],
) => {
  let query = {
    year,
    semester,
    title: textQuery || '',
    limit: 200,
    ...userQuery,
    time_mask,
  };

  // remove empty filter
  for (let field in query) {
    if ((query as { [key: string]: any })[field].length === 0) {
      delete (query as { [key: string]: any })[field];
    }
  }

  return query;
};

export const getQueryTimeMask = (
  useTime: boolean,
  searchEmptySlot: boolean,
  courseTimemasks: number[][],
  userTimemask: number[],
) => {
  if (!useTime) {
    return [];
  } else if (searchEmptySlot) {
    const invertedMasks = complement(courseTimemasks);
    return invertedMasks;
  }
  return userTimemask;
};
