import update from 'immutability-helper';
import * as types from '../actions/actionTypes.js';

/**
 * currentId: '_id' field of current timetable object
 * tableIndex: { id, year, semester, title } of tables
 * tableMap: object of whole tables
 */
const DEFAULT_TABLELIST = {
  viewLectures: null,
  viewTableId: null,
  viewTableTabList: [],
  viewYear: null,
  viewSemester: null,
  tableList: [],
  tableMap: {},
  colorScheme: [],
};

function getViewTableTabList(tableList, year, semester) {
  const viewTableTabList = [];
  for (let i = 0; i < tableList.length; i++) {
    if (tableList[i].year === year && tableList[i].semester === semester) {
      viewTableTabList.push(tableList[i]);
    }
  }
  return viewTableTabList;
}

function getViewLectures(tableMap, viewTableId, colorScheme) {
  let viewLectures = viewTableId
    ? tableMap[viewTableId]
      ? tableMap[viewTableId].lecture_list
      : []
    : null;
  if (viewLectures && colorScheme.length > 0) {
    viewLectures = viewLectures.map(lecture => {
      if (lecture.colorIndex && lecture.colorIndex <= colorScheme.length) {
        lecture.color = colorScheme[lecture.colorIndex - 1];
      }
      return lecture;
    });
  }
  return viewLectures;
}

export function tableList(state = DEFAULT_TABLELIST, action) {
  switch (action.type) {
    case types.CHANGE_COURSEBOOK: {
      const { year: viewYear, semester: viewSemester } = action.newCourseBook;
      const {
        tableList,
        viewYear: oldViewYear,
        viewSemester: oldViewSemester,
      } = state;
      if (viewYear !== oldViewYear || viewSemester !== oldViewSemester) {
        const viewTableTabList = getViewTableTabList(
          tableList,
          viewYear,
          viewSemester,
        );
        return {
          ...state,
          viewYear,
          viewSemester,
          viewTableTabList,
        };
      }
      return state;
    }
    case types.GET_TABLELIST: {
      const { viewYear, viewSemester, tableList } = state;
      const newTableList = action.response;

      let listChanged = false;
      if (tableList.length === newTableList.length) {
        for (let i = 0; i < tableList.length; i++) {
          if (
            tableList[i]._id !== newTableList[i]._id ||
            tableList[i].title !== newTableList[i].title
          ) {
            listChanged = true;
            break;
          }
        }
      } else listChanged = true;

      if (listChanged) {
        const viewTableTabList = getViewTableTabList(
          newTableList,
          viewYear,
          viewSemester,
        );
        return {
          ...state,
          tableList: newTableList,
          viewTableTabList,
        };
      }
      return state;
    }
    case types.ADD_LECTURE_OK: {
      const { viewTableId, colorScheme } = state;
      const updated = action.response;
      const tableMap = update(state.tableMap, {
        [updated._id]: { $set: updated },
      });
      const viewLectures = getViewLectures(tableMap, viewTableId, colorScheme);
      return {
        ...state,
        tableMap,
        viewLectures,
      };
    }
    case types.DELETE_LECTURE_OK: {
      const { viewTableId, colorScheme } = state;
      const updated = action.response;
      const tableMap = update(state.tableMap, {
        [updated._id]: { $set: updated },
      });
      const viewLectures = getViewLectures(tableMap, viewTableId, colorScheme);
      return {
        ...state,
        tableMap,
        viewLectures,
      };
    }
    case types.UPDATE_TITLE_OK: {
      const tableList = action.response;
      const { viewYear, viewSemester } = state;
      const viewTableTabList = getViewTableTabList(
        tableList,
        viewYear,
        viewSemester,
      );
      return {
        ...state,
        tableList,
        viewTableTabList,
      };
    }
    case types.UPDATE_LECTURE_OK: {
      const { viewTableId, colorScheme } = state;
      const updatedTable = action.response;
      const updatedId = updatedTable._id;
      const tableMap = update(state.tableMap, {
        [updatedId]: { $set: updatedTable },
      });
      const viewLectures = getViewLectures(tableMap, viewTableId, colorScheme);
      return {
        ...state,
        tableMap,
        viewLectures,
      };
    }
    case types.CREATE_TABLE_OK: {
      const tableList = action.response;
      const { viewYear, viewSemester } = state;
      const viewTableTabList = getViewTableTabList(
        tableList,
        viewYear,
        viewSemester,
      );
      return {
        ...state,
        tableList,
        viewTableTabList,
      };
    }
    case types.DELETE_TABLE_OK: {
      const tableList = action.response;
      const { viewYear, viewSemester } = state;
      const viewTableTabList = getViewTableTabList(
        tableList,
        viewYear,
        viewSemester,
      );
      return {
        ...state,
        tableList,
        viewTableTabList,
      };
    }

    case types.GET_COLOR_OK: {
      const { tableMap, viewTableId } = state;
      const colorScheme = action.response.colors;
      const viewLectures = getViewLectures(tableMap, viewTableId, colorScheme);
      return {
        ...state,
        viewLectures,
        colorScheme,
      };
    }

    case types.SWITCH_TABLE_START: {
      const { oldViewTableId, tableMap, colorScheme } = state;
      const viewTableId = action.payload.tableId;
      if (oldViewTableId === viewTableId) return state;
      const viewLectures = getViewLectures(tableMap, viewTableId, colorScheme);
      return {
        ...state,
        viewTableId,
        viewLectures,
      };
    }
    case types.SWITCH_TABLE_OK: {
      const { viewTableId, colorScheme } = state;
      const updatedTable = action.response;
      const updatedId = updatedTable._id;
      const tableMap = update(state.tableMap, {
        [updatedId]: { $set: updatedTable },
      });
      const viewLectures = getViewLectures(tableMap, viewTableId, colorScheme);
      return {
        ...state,
        tableMap,
        viewLectures,
      };
    }
    case types.LOGOUT_SUCCESS:
      return DEFAULT_TABLELIST;
    default:
      return state;
  }
}

export function tagList(state = {}, action) {
  switch (action.type) {
    case types.GET_TAG:
      return action.response;
    default:
      return state;
  }
}
