import { Reducer } from 'redux';
import { getType } from 'typesafe-actions';
import update from 'immutability-helper';

import { CourseBook, Lecture, LectureQuery, TagList } from 'types';
import * as actions from './actions';

export interface SearchState {
  hoveredCourse: Lecture | null; // the course hovered on left side
  tableHoveredCourse: Lecture | null; // the course hovered on the right side
  filter: {
    panel: boolean;
    timePanel: boolean;
    useTime: boolean;
    searchEmptySlot: boolean;
  };
  query: LectureQuery;
  searchResults: Lecture[];
  isQuerying: boolean;
  leftTabSearching: boolean;
  tagList: TagList | null;
}

export const initialQuery = {
  classification: [],
  credit: [],
  course_number: [],
  academic_year: [],
  instructor: [],
  department: [],
  category: [],
  etc: [],
  time_mask: [0, 0, 0, 0, 0, 0, 0],
};

export const initialState: SearchState = {
  hoveredCourse: null,
  tableHoveredCourse: null,
  filter: {
    panel: false,
    timePanel: false,
    useTime: false,
    searchEmptySlot: true,
  },
  query: initialQuery,
  searchResults: [],
  isQuerying: false,
  leftTabSearching: false,
  tagList: null,
};

export const searchReducer: Reducer<SearchState, actions.searchActionTypes> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case getType(actions.hoverCourse): {
      return {
        ...state,
        hoveredCourse: action.payload.course,
      };
    }
    case getType(actions.unhoverCourse): {
      return {
        ...state,
        hoveredCourse: null,
      };
    }
    case getType(actions.tableHoverCourse): {
      return {
        ...state,
        tableHoveredCourse: action.payload.course,
      };
    }
    case getType(actions.tableUnhoverCourse): {
      return {
        ...state,
        tableHoveredCourse: null,
      };
    }
    case getType(actions.updateQuery): {
      return {
        ...state,
        query: {
          ...state.query,
          ...action.payload.partialQuery,
        },
      };
    }
    case getType(actions.addQuery): {
      const { field, value } = action.payload;
      const filterValues = state.query[field] as (typeof value)[];
      const valueIndex = filterValues.findIndex(item => item === value);
      if (valueIndex === -1) {
        return {
          ...state,
          query: {
            ...state.query,
            [field]: update(filterValues, { $push: [value] }),
          },
        };
      }
      return state;
    }
    case getType(actions.removeQuery): {
      const { field, value } = action.payload;
      const filterValues = state.query[field] as (typeof value)[];
      const valueIndex = filterValues.findIndex(item => item === value);
      if (valueIndex !== -1) {
        return {
          ...state,
          query: {
            ...state.query,
            [field]: update(filterValues, { $splice: [[valueIndex, 1]] }),
          },
        };
      }
      return state;
    }
    case getType(actions.toggleQuery): {
      const { field, value } = action.payload;
      const filterValues = state.query[field] as (typeof value)[];
      const valueIndex = filterValues.findIndex(item => item === value);
      if (valueIndex === -1) {
        return {
          ...state,
          query: {
            ...state.query,
            [field]: update(filterValues, { $push: [value] }),
          },
        };
      } else {
        return {
          ...state,
          query: {
            ...state.query,
            [field]: update(filterValues, { $splice: [[valueIndex, 1]] }),
          },
        };
      }
    }
    case getType(actions.resetQuery): {
      return {
        ...state,
        query: initialQuery,
      };
    }
    case getType(actions.startQuery): {
      return {
        ...state,
        isQuerying: true,
      };
    }
    case getType(actions.endQuery): {
      return {
        ...state,
        isQuerying: false,
      };
    }
    case getType(actions.showResult): {
      return {
        ...state,
        searchResults: action.payload.courses,
      };
    }
    case getType(actions.toggleSearchPanel): {
      const nextPanelState =
        action.payload.on === undefined
          ? !state.filter.panel
          : action.payload.on;
      return {
        ...state,
        filter: {
          ...state.filter,
          panel: nextPanelState,
        },
      };
    }
    case getType(actions.toggleTimePanel): {
      return {
        ...state,
        filter: {
          ...state.filter,
          timePanel: !state.filter.timePanel,
        },
      };
    }
    case getType(actions.toggleUseTime): {
      return {
        ...state,
        filter: {
          ...state.filter,
          useTime: !state.filter.useTime,
        },
      };
    }
    case getType(actions.selectTimeMode): {
      return {
        ...state,
        filter: {
          ...state.filter,
          searchEmptySlot: action.payload.mode,
        },
      };
    }
    case getType(actions.setTags): {
      return {
        ...state,
        tagList: action.payload.tags,
      };
    }
    case getType(actions.setLeftTab): {
      return {
        ...state,
        leftTabSearching: action.payload.searching,
      };
    }
    default:
      return {
        ...state,
        isQuerying: false,
      };
  }
};
