import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import { timetableReducer, initialState } from './reducers';
import {
  updateTimetable,
  updateColorScheme,
  updateViewTable,
  updateTimetableList,
  addLecture,
  addCustomLecture,
  deleteLecture,
  updateLecture,
  updateTitle,
  createTable,
  deleteTable,
  switchTable,
} from './actions';
import mockTable from './__tests__/mockTable.json';
import {
  addLecture as addLectureApi,
  addCustomLecture as addCustomLectureApi,
  deleteLecture as deleteLectureApi,
  updateLecture as updateLectureApi,
  updateTableTitle as updateTableTitleApi,
  postNewTable as postNewTableApi,
  deleteTableById as deleteTableByIdApi,
  getTable as getTableApi,
} from 'api';
import { AbstractTimetable, LectureColor, SampleLecture } from 'types';

jest.mock('api');

describe('timetable ducks', () => {
  describe('action creator and reducers', () => {
    it('updateTimetableList action should update tableMap', () => {
      const tableA: AbstractTimetable = mockTable;
      const tableB: AbstractTimetable = { ...mockTable, _id: 'abcde' };
      const tableList = [tableA, tableB];
      const updatedMap = timetableReducer(
        undefined,
        updateTimetableList(tableList),
      ).tableMap;
      expect(updatedMap).toHaveProperty(tableA._id);
      expect(updatedMap).toHaveProperty(tableB._id);
    });

    it('updateTimetable action should update timetable with same id', () => {
      const timetableState = initialState;
      timetableState.tableMap = {
        abcd: mockTable,
      };
      const newTitle = 'mock course 2';
      const newCourse = { ...mockTable, title: newTitle };
      expect(
        timetableReducer(timetableState, updateTimetable(newCourse)).tableMap
          .abcd,
      ).toEqual(newCourse);
    });

    it('updateColorSchme should update colorscheme state', () => {
      const newColorScheme: LectureColor[] = [{ fg: '#ffffff', bg: '#ffffff' }];
      expect(
        timetableReducer(undefined, updateColorScheme(newColorScheme))
          .colorScheme,
      ).toEqual(newColorScheme);
    });

    it('updateViewTable should update viewtable id and tablemap', () => {
      const updatedTimetableState = timetableReducer(
        undefined,
        updateViewTable(mockTable),
      );
      expect(updatedTimetableState.viewTableId).toEqual(mockTable._id);
      expect(updatedTimetableState.tableMap).toHaveProperty(
        mockTable._id,
        mockTable,
      );
    });
  });

  describe('thunk actions', () => {
    let store: MockStoreEnhanced<undefined, {}>;
    const viewTableId = 'abcd';
    beforeEach(() => {
      //@ts-ignore
      store = mockStore({ tableList: { viewTableId } });
    });
    beforeAll(() => {
      //@ts-ignore
      addLectureApi.mockResolvedValueOnce(mockTable);
      //@ts-ignore
      addCustomLectureApi.mockResolvedValueOnce(mockTable);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('addLecture should add selected lecture via API and apply the result', () => {
      //@ts-ignore
      return store.dispatch(addLecture(SampleLecture)).then(() => {
        expect(addLectureApi).toHaveBeenCalledTimes(1);
        expect(addLectureApi).toHaveBeenCalledWith('abcd', SampleLecture._id);
        expect(store.getActions()[0].type).toBe('@table/updateTimetable');
      });
    });

    it('addLecture should not call API if viewTableId is not set', () => {
      const storeWithoutViewTableId = mockStore({
        tableList: { viewTableId: undefined },
      });
      //@ts-ignore
      global.alert = jest.fn();

      //@ts-ignore
      return (
        storeWithoutViewTableId
          //@ts-ignore
          .dispatch(addLecture(SampleLecture))
          .then(() => {
            expect(addLectureApi).toHaveBeenCalledTimes(0);
            //@ts-ignore
            expect(global.alert).toHaveBeenCalledTimes(1);
            expect(store.getActions().length).toBe(0);
          })
      );
    });

    it('addCustomLecture should add custom lecture via API and apply the result', () => {
      //@ts-ignore
      return store.dispatch(addCustomLecture(SampleLecture)).then(() => {
        expect(addCustomLectureApi).toHaveBeenCalledTimes(1);
        expect(addCustomLectureApi).toHaveBeenCalledWith('abcd', SampleLecture);
        expect(store.getActions()[0].type).toBe('@table/updateTimetable');
      });
    });

    it('deleteLecture should remove selected lecture via API and update the table', () => {
      //@ts-ignore
      deleteLectureApi.mockResolvedValueOnce(mockTable);
      //@ts-ignore
      return store.dispatch(deleteLecture(SampleLecture._id)).then(() => {
        expect(deleteLectureApi).toHaveBeenCalledTimes(1);
        expect(deleteLectureApi).toHaveBeenCalledWith(
          viewTableId,
          SampleLecture._id,
        );
        expect(store.getActions().length).toBe(1);
        expect(store.getActions()[0].type).toBe('@table/updateTimetable');
      });
    });

    it('updateLecture should send updated part to API and update the table', () => {
      //@ts-ignore
      updateLectureApi.mockResolvedValueOnce(mockTable);
      return store
        .dispatch(
          //@ts-ignore
          updateLecture('lecture_id', { course_title: 'new_course_title' }),
        )
        .then(() => {
          expect(updateLectureApi).toHaveBeenCalledTimes(1);
          expect(store.getActions().length).toBe(1);
          expect(store.getActions()[0].type).toBe('@table/updateTimetable');
        });
    });

    it('updateTitle should send new title to API and update the tablelist', () => {
      //@ts-ignore
      updateTableTitleApi.mockResolvedValueOnce([mockTable]);
      //@ts-ignore
      return store.dispatch(updateTitle('newtitle')).then(() => {
        expect(updateTableTitleApi).toHaveBeenCalledTimes(1);
        expect(store.getActions().length).toBe(1);
        expect(store.getActions()[0].type).toBe('@table/updateTimetableList');
      });
    });

    it('createTable should send new table to API and update the tablelist', () => {
      const storeWithTableAndCoursebook = mockStore({
        tableList: { viewTableId },
        courseBook: {
          current: {
            year: 2019,
            semester: 3,
          },
        },
      });
      //@ts-ignore
      postNewTableApi.mockResolvedValueOnce([mockTable]);
      //@ts-ignore
      return (
        storeWithTableAndCoursebook
          //@ts-ignore
          .dispatch(createTable('newtitle'))
          .then(() => {
            expect(postNewTableApi).toHaveBeenCalledTimes(1);
            expect(postNewTableApi).toHaveBeenCalledWith(2019, 3, 'newtitle');
            expect(storeWithTableAndCoursebook.getActions().length).toBe(1);
            expect(storeWithTableAndCoursebook.getActions()[0].type).toBe(
              '@table/updateTimetableList',
            );
          })
      );
    });
  });
});
