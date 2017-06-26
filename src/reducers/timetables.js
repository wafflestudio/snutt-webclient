import update from 'react-addons-update';
import * as types from '../actions/actionTypes.js';

/**
 * currentId: '_id' field of current timetable object
 * tableIndex: { id, year, semester, title } of tables
 * tableMap: object of whole tables
 */
const DEFAULT_TABLELIST = {
  viewTableId: null,
  viewTableTabList: [],
  viewYear: null,
  viewSemester: null,
  tableList: [],
  tableMap: {},
};

function getViewTableTabList(tableList, year, semester) {
  let viewTableTabList = [];
  for (let i=0; i<tableList.length; i++) {
    if (tableList[i].year == year && tableList[i].semester == semester) {
      viewTableTabList.push(tableList[i]);
    }
  }
  return viewTableTabList;
}

export function tableList(state = DEFAULT_TABLELIST, action) {
  switch (action.type) {
    case types.CHANGE_COURSEBOOK: {
      const { year: viewYear, semester: viewSemester } = action.newCourseBook;
      const { tableList, viewYear: oldViewYear, viewSemester: oldViewSemester } = state;
      if ( viewYear != oldViewYear || viewSemester != oldViewSemester ) {
        const viewTableTabList = getViewTableTabList(tableList, viewYear, viewSemester);
        return {
          ...state,
          viewYear,
          viewSemester,
          viewTableTabList
        }
      } else {
        return state;
      }
    }
    case types.GET_TABLELIST: {
      const { viewYear, viewSemester, tableList} = state;
      const newTableList = action.response;

      let listChanged = false;
      if (tableList.length == newTableList.length) {
        for (let i=0; i<tableList.length; i++) {
          if (tableList[i]._id != newTableList[i]._id ||
              tableList[i].title !== newTableList[i].title) {
                listChanged = true;
                break;
              }
        }
      } else listChanged = true;

      if (listChanged) {
        const viewTableTabList = getViewTableTabList(newTableList, viewYear, viewSemester);
        return {
          ...state,
          tableList: newTableList,
          viewTableTabList
        };
      } else return state;
    }
    case types.ADD_LECTURE_OK: {
      const updated = action.response;
      return {
        ...state,
        tableMap: update(state.tableMap, { [updated._id]: { $set: updated } }),
      };
    }
    case types.DELETE_LECTURE_OK: {
      const updated = action.response;
      return {
        ...state,
        tableMap: update(state.tableMap, { [updated._id]: { $set: updated } }),
      };
    }
    case types.UPDATE_TITLE_OK: {
      const tableList = action.response;
      const viewTableTabList = getViewTableTabList(tableList, viewYear, viewSemester);
      return {
        ...state,
        tableList,
        viewTableTabList
      };
    }
    case types.UPDATE_LECTURE_OK: {
      const updatedTable = action.response;
      const updatedId = updatedTable._id;
      return {
        ...state,
        tableMap: update(state.tableMap, { [updatedId]: { $set: updatedTable } }),
      };
    }
    case types.CREATE_TABLE_OK: {
      const tableList = action.response;
      const { viewYear, viewSemester } = state;
      const viewTableTabList = getViewTableTabList(tableList, viewYear, viewSemester);
      return {
        ...state,
        tableList,
        viewTableTabList
      };
    }
    case types.DELETE_TABLE_OK: {
      const tableList = action.response;
      const { viewYear, viewSemester } = state;
      const viewTableTabList = getViewTableTabList(tableList, viewYear, viewSemester);
      return {
        ...state,
        tableList,
        viewTableTabList
      };
    }
    case types.SWITCH_TABLE_START: {
      if (state.viewTableId === action.payload.tableId) return state;
      else return {
        ...state,
        viewTableId: action.payload.tableId,
      }
    }
    case types.SWITCH_TABLE_OK: {
      const updatedTable = action.response;
      const updatedId = updatedTable._id;
      return {
        ...state,
        tableMap: update(state.tableMap, { [updatedId]: { $set: updatedTable } }),
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
