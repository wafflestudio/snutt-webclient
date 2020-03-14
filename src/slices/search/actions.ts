import * as api from 'api';
import { uniqBy } from 'lodash/array';

import { AppThunk } from 'slices';
import { startSearch, showSearchResult } from '.';

import { complement } from 'components/MakeTimetable/Search/TimeQuery.jsx';

export const runQuery = (textQuery: string): AppThunk => async (
  dispatch,
  getState,
) => {
  const state = getState();
  if (!state.courseBook.current) return;

  const {
    courseBook: {
      current: { year, semester },
    },
    search: { query: filters, useTime, searchEmptyTime },
    tableList: { viewTableId, tableMap },
  } = state;

  let query = { ...filters };
  // Remove filter without value
  for (const key in query) {
    const value = query[key];
    if (value.length === 0) {
      delete query[key];
    }
  }

  const fullQuery = { year, semester, title: textQuery, limit: 200, ...query };

  // Handle times
  if (!useTime) {
    delete fullQuery.time_mask;
  } else if (searchEmptyTime && viewTableId) {
    // use free time as query
    const viewLectures = tableMap[viewTableId].lecture_list;
    const currentMasks = viewLectures.map(lecture => lecture.class_time_mask);
    const invertedMasks = complement(currentMasks);
    fullQuery.time_mask = invertedMasks;
  } else {
    // Time selector already updated time_mask
  }

  dispatch(startSearch());
  const courses = await api.getQueryResults(fullQuery);
  const uniqueCourses = uniqBy(courses, '_id');
  dispatch(showSearchResult(uniqueCourses));
};
