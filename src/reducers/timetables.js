import update from 'immutability-helper';
import * as types from '../actions/actionTypes.js';

/**
 * currentId: '_id' field of current timetable object
 * tableIndex: { id, year, semester, title } of tables
 * tableMap: object of whole tables
 */
const DEFAULT_TABLELIST = {
  viewTableId: null,
  tableMap: {},
  colorScheme: [],
};

export function tableList(state = DEFAULT_TABLELIST, action) {
  switch (action.type) {
    // 넷 다 table list를 반환
    case types.UPDATE_TITLE_OK:
    case types.DELETE_TABLE_OK:
    case types.CREATE_TABLE_OK:
    case types.GET_TABLELIST: {
      const { tableMap: oldTableMap } = state;
      const newTableList = action.response || action.tableList;
      // Normalize table list
      const tableMap = newTableList.reduce((prevTables, currentTable) => {
        const id = currentTable._id;
        // Merge with table info we had
        prevTables[id] = {
          ...oldTableMap[id],
          ...currentTable,
        };
        return prevTables;
      }, {});

      return {
        ...state,
        tableMap,
      };
    }
    case types.ADD_LECTURE_OK: {
      const updated = action.response;
      const tableMap = update(state.tableMap, {
        [updated._id]: { $set: updated },
      });
      return {
        ...state,
        tableMap,
      };
    }
    case types.DELETE_LECTURE_OK: {
      const updated = action.response;
      const tableMap = update(state.tableMap, {
        [updated._id]: { $set: updated },
      });
      return {
        ...state,
        tableMap,
      };
    }
    case types.UPDATE_LECTURE_OK: {
      const updatedTable = action.response;
      const updatedId = updatedTable._id;
      const tableMap = update(state.tableMap, {
        [updatedId]: { $set: updatedTable },
      });
      return {
        ...state,
        tableMap,
      };
    }
    case types.LOAD_OK: {
      const { colors: colorScheme } = action;
      return {
        ...state,
        colorScheme,
      };
    }
    case types.SWITCH_TABLE_OK: {
      const updatedTable = action.response;
      if (updatedTable._id) {
        const { tableMap: oldTableMap } = state;
        const tableMap = Object.assign({}, oldTableMap, {
          [updatedTable._id]: {
            ...oldTableMap[updatedTable._id],
            ...updatedTable,
          },
        });
        return {
          ...state,
          tableMap,
          viewTableId: updatedTable._id,
        };
      }
      return {
        ...state,
        viewTableId: null,
      };
    }

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
