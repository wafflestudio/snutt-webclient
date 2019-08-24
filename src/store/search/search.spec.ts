import client from 'api/client';
import MockAdapter from 'axios-mock-adapter';
import { LectureQuery } from 'types';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  hoverCourse,
  unhoverCourse,
  tableHoverCourse,
  tableUnhoverCourse,
  updateQuery,
  addQuery,
  removeQuery,
  toggleQuery,
  resetQuery,
  startQuery,
  endQuery,
  showResult,
  toggleSearchPanel,
  toggleTimePanel,
  toggleUseTime,
  setLeftTab,
  setTags,
  makeQueryRequest,
  getQueryTimeMask,
  runQuery,
} from './actions';
import {
  initialQuery,
  searchReducer,
  initialState,
  SearchState,
} from './reducers';
import { SampleLecture } from '../../types/core/lecture';
import sampleSearchResult from './data/sampleResults';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('search ducks', () => {
  it('hoverCourse action should put hovered course on the store', () => {
    expect(
      searchReducer(undefined, hoverCourse(SampleLecture)).hoveredCourse,
    ).toEqual(SampleLecture);
  });

  it('unhoverCourse action should remove hovered course on the store', () => {
    expect(searchReducer(undefined, unhoverCourse()).hoveredCourse).toBeFalsy();
  });

  it('tableHoverCourse action should put hovered course on the store', () => {
    expect(
      searchReducer(undefined, tableHoverCourse(SampleLecture))
        .tableHoveredCourse,
    ).toEqual(SampleLecture);
  });

  it('unhoverCourse action should remove hovered course on the store', () => {
    expect(
      searchReducer(undefined, tableUnhoverCourse()).tableHoveredCourse,
    ).toBeFalsy();
  });

  it('updateQuery should merge payload with existing query', () => {
    const samplePartialQuery: Partial<LectureQuery> = {
      instructor: ['lia', 'yuna'],
    };
    expect(
      searchReducer(undefined, updateQuery(samplePartialQuery)).query
        .instructor,
    ).toEqual(samplePartialQuery.instructor);
  });

  describe('query attribute actions', () => {
    let stateWithInstructor: SearchState;
    const instructorQuery: Partial<LectureQuery> = {
      instructor: ['lia', 'yuna'],
    };
    beforeEach(() => {
      stateWithInstructor = searchReducer(
        undefined,
        updateQuery(instructorQuery),
      );
    });

    it('addQuery should add item to  attribute if the item is not in the list', () => {
      expect(
        searchReducer(stateWithInstructor, addQuery('instructor', 'yeji')).query
          .instructor,
      ).toContainEqual('yeji');
      expect(
        searchReducer(stateWithInstructor, addQuery('instructor', 'lia')).query
          .instructor,
      ).toEqual(instructorQuery.instructor);
    });

    it('removeQuery should remove item from attribute', () => {
      expect(
        searchReducer(stateWithInstructor, removeQuery('instructor', 'lia'))
          .query.instructor,
      ).not.toContainEqual('lia');
    });

    it('removeQuery should not throw error when item is not in the list', () => {
      expect(
        searchReducer(stateWithInstructor, removeQuery('instructor', 'yeji'))
          .query.instructor,
      ).not.toContainEqual('yeji');
    });

    it('toggleQuery should add item if it was not in the list', () => {
      expect(
        searchReducer(stateWithInstructor, toggleQuery('instructor', 'yeji'))
          .query.instructor,
      ).toContainEqual('yeji');
    });

    it('toggleQuery should remove item if it was in the list', () => {
      expect(
        searchReducer(stateWithInstructor, toggleQuery('instructor', 'lia'))
          .query.instructor,
      ).not.toContainEqual('lia');
    });

    it('resetQuery should update query to initial state', () => {
      expect(searchReducer(stateWithInstructor, resetQuery())).toEqual(
        initialState,
      );
    });
  });

  it('startQuery action should update querying state of store', () => {
    expect(searchReducer(undefined, startQuery()).isQuerying).toBe(true);
  });

  it('endQuery action should update querying state of store', () => {
    expect(searchReducer(undefined, endQuery()).isQuerying).toBe(false);
  });

  it('toggleSearchPanel should toggle filter panel on/off state', () => {
    const panelOnState = searchReducer(undefined, toggleSearchPanel());
    expect(panelOnState.filter.panel).toBe(true);
    expect(searchReducer(panelOnState, toggleSearchPanel()).filter.panel).toBe(
      false,
    );
  });

  it('toggleTimePanel should toggle time filter panel on/off state', () => {
    const panelOnState = searchReducer(undefined, toggleTimePanel());
    expect(panelOnState.filter.timePanel).toBe(true);
    expect(
      searchReducer(panelOnState, toggleTimePanel()).filter.timePanel,
    ).toBe(false);
  });

  it('toggleUseTime should toggle use time option in the filter', () => {
    const panelOnState = searchReducer(undefined, toggleUseTime());
    expect(panelOnState.filter.useTime).toBe(true);
    expect(searchReducer(panelOnState, toggleUseTime()).filter.useTime).toBe(
      false,
    );
  });

  it('setLefttab should update left panel state between search <-> current course', () => {
    expect(searchReducer(undefined, setLeftTab(true)).leftTabSearching).toBe(
      true,
    );
    expect(searchReducer(undefined, setLeftTab(false)).leftTabSearching).toBe(
      false,
    );
  });

  describe('runQuery', () => {
    let store: MockStoreEnhanced<unknown, {}>;
    beforeEach(() => {
      store = mockStore({
        search: initialState,
      });
    });
  });

  describe('makeQueryRequest', () => {
    let year: number;
    let semester: number;
    let textQuery: string;
    let userQuery: LectureQuery;

    beforeEach(() => {
      userQuery = initialQuery;
      textQuery = '글기';
      year = 2019;
      semester = 3;
    });

    it('should contain year, semester and text query', () => {
      const queryRequest = makeQueryRequest(
        userQuery,
        year,
        semester,
        textQuery,
        [0, 0, 0, 0, 0, 0, 0],
      );
      expect(queryRequest.title).toEqual(textQuery);
      expect(queryRequest.year).toEqual(year);
      expect(queryRequest.semester).toEqual(semester);
    });

    it('should ignore empty fields', () => {
      const queryRequest = makeQueryRequest(
        userQuery,
        year,
        semester,
        textQuery,
        [],
      );
      expect(queryRequest.time_mask).toBeUndefined();
      expect(queryRequest.classification).toBeUndefined();
    });

    it('should keep non-empty fields', () => {
      userQuery = {
        ...userQuery,
        classification: ['체육'],
      };
      const queryRequest = makeQueryRequest(
        userQuery,
        year,
        semester,
        textQuery,
        [],
      );
      expect(queryRequest.time_mask).toBeUndefined();
      expect(queryRequest.classification).toEqual(['체육']);
    });
  });

  describe('getQueryTimeMask', () => {
    it('should preserve time range from user if useTime option is given', () => {
      const userTimemask = [7, 7, 7, 7, 7, 7, 7];
      const queryTimemask = getQueryTimeMask(
        true,
        false,
        [[0, 0, 0, 0, 0, 0, 0]],
        userTimemask,
      );
      expect(queryTimemask).toEqual(userTimemask);
    });

    it('should return empty timemask if userTime option is not used', () => {
      const userTimemask = [7, 7, 7, 7, 7, 7, 7];
      const queryTimemask = getQueryTimeMask(
        false,
        false,
        [[0, 0, 0, 0, 0, 0, 0]],
        userTimemask,
      );
      expect(queryTimemask).toEqual([]);
    });

    it('should return complement of courseTimemask if option is used', () => {
      const thiryOnes = 2 ** 30 - 1;
      const maskWithAllOne = new Array(7).fill(thiryOnes);
      const queryTimemask = getQueryTimeMask(
        true,
        true,
        [[0, 0, 0, 0, 0, 0, 0]],
        [],
      );
      expect(queryTimemask).toEqual(maskWithAllOne);
    });
  });
});
