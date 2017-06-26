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
  const { viewTableId, tableMap, tableIndex } = state;
  switch (action.type) {
    case types.REQUEST_TABLELIST: {
      const { year: viewYear, semester: viewSemester } = action.payload;
      const { tableList } = state;
      const viewTableTabList = getViewTableTabList(tableList, viewYear, viewSemester);
      return {
        ...state,
        viewTableTabList,
        viewYear,
        viewSemester
      };
    }
    case types.GET_TABLELIST: {
      const { year: viewYear, semester: viewSemester } = action.payload;
      const tableList = action.response;
      const viewTableTabList = getViewTableTabList(tableList, viewYear, viewSemester);
      return {
        ...state,
        tableList,
        viewTableTabList
      };
    }
    case types.ADD_LECTURE_OK: {
      const updated = action.response;
      return {
        ...state,
        tableMap: update(tableMap, { [updated._id]: { $set: updated } }),
      };
    }
    case types.DELETE_LECTURE_OK: {
      const updated = action.response;
      return {
        ...state,
        tableMap: update(tableMap, { [updated._id]: { $set: updated } }),
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
        tableMap: update(tableMap, { [updatedId]: { $set: updatedTable } }),
      };
    }
    case types.CREATE_TABLE_OK: {
      const tableList = action.response;
      const viewTableTabList = getViewTableTabList(tableList, viewYear, viewSemester);
      return {
        ...state,
        tableList,
        viewTableTabList
      };
    }
    case types.DELETE_TABLE_OK: {
      const tableList = action.response;
      const viewTableTabList = getViewTableTabList(tableList, viewYear, viewSemester);
      const viewTableId = (viewTableTabList.length > 0) ? viewTableTabList[0]._id : null;
      return {
        ...state,
        tableList,
        viewTableTabList,
        viewTableId
      };
    }
    case types.SWITCH_TABLE_START: {
      return {
        ...state,
        viewTableId: action.payload.tableId,
      }
    }
    case types.SWITCH_TABLE_OK: {
      const updatedTable = action.response;
      const updatedId = updatedTable._id;
      return {
        ...state,
        tableMap: update(tableMap, { [updatedId]: { $set: updatedTable } }),
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
