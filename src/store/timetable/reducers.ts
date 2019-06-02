import update from 'immutability-helper';
import { Reducer } from 'redux';
import { getType } from 'typesafe-actions';

import * as actions from './actions';

import { AbstractTimetable, Timetable, LectureColor } from 'types';

interface TableState {
  viewTableId: string | null;
  tableMap: { [key: string]: AbstractTimetable | Timetable };
  colorScheme: LectureColor[];
}

const initialState: TableState = {
  viewTableId: null,
  tableMap: {},
  colorScheme: [],
};

export const timetableReducer: Reducer<
  TableState,
  actions.TimetableActionTypes
> = (state = initialState, action) => {
  switch (action.type) {
    case getType(actions.updateTimetableList): {
      const { tableMap: oldTableMap } = state;
      const newTableList = action.payload.tableList;
      // Normalize table list
      const tableMap = newTableList.reduce<TableState['tableMap']>(
        (prevTables, currentTable) => {
          const id = currentTable._id;
          // Merge with table info we had
          prevTables[id] = {
            ...oldTableMap[id],
            ...currentTable,
          };
          return prevTables;
        },
        {},
      );

      return {
        ...state,
        tableMap,
      };
    }

    case getType(actions.updateTimetable): {
      const updated = action.payload.table;
      const tableMap = update(state.tableMap, {
        [updated._id]: { $set: updated },
      });
      return {
        ...state,
        tableMap,
      };
    }

    case getType(actions.updateColorScheme): {
      const colorScheme = action.payload.colorScheme;
      return {
        ...state,
        colorScheme,
      };
    }

    case getType(actions.updateViewTable): {
      const updatedTable = action.payload.table;
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
};
