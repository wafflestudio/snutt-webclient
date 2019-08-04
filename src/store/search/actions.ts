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
} from 'types';
import { AppState } from '../index';
import { complement } from 'components/Search/TimeQuery';
import { UPDATE_TITLE_FAIL } from 'src/actions/actionTypes';
import { create } from 'domain';

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

export const showResult = createAction(
  '@search/showResult',
  action => (courses: Lecture[]) => action({ courses }),
);

export const toggleSearchPanel = createAction(
  '@search/toggleSearchPanel',
  action => () => action(),
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

  let query: LectureQuery & {
    year: number;
    semester: number;
    title: string;
  } = {
    year,
    semester,
    title: userQuery.title || '',
    limit: 200,
    ...userQuery,
  };

  if (!useTime) {
    delete query.class_time_mask;
  } else if (searchEmptySlot) {
    if (!viewTableId) return;
    const currentLectures = tableMap[viewTableId];
    if ((currentLectures as Timetable).lecture_list) {
      const masks = (currentLectures as Timetable).lecture_list.map(
        l => l.class_time_mask,
      );
      const invertedMasks = complement(masks);
      query.class_time_mask = invertedMasks;
    }
  }

  dispatch(startQuery());
  const courses = await api.getQueryResults(query);
  courses && dispatch(showResult(courses));
};
