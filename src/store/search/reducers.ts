import { Reducer } from 'redux';
import { getType } from 'typesafe-actions';
import { CourseBook, Lecture, LectureQuery } from 'types';
import { tableHoverCourse, hoverCourse } from 'src/actions';
import * as actions from './actions';

interface SearchState {
  hoveredCourse: Lecture | null; // the course hovered on left side
  tableHoveredCourse: Lecture | null; // the course hovered on the right side
  filter: {
    panel: boolean;
    timePanel: boolean;
    useTime: boolean;
    searchEmptySlot: boolean;
  };
  query: Partial<LectureQuery>;
  searchResults: Lecture[];
  isQuerying: boolean;
  leftTabSearching: boolean;
}

const initialQuery = {
  title: '',
};

const initialState: SearchState = {
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
    case getType(actions.showResult): {
      return {
        ...state,
        searchResults: action.payload.courses,
      };
    }
    case getType(actions.toggleSearchPanel): {
      return {
        ...state,
        filter: {
          ...state.filter,
          panel: !state.filter.panel,
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
    default:
      return {
        ...state,
        isQuerying: false,
      };
  }
};
