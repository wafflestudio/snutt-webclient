import { combineReducers } from 'redux';
import { notificationReducer } from './notification/reducers';
import { timetableReducer } from './timetable/reducers';
import { courseEditorReducer } from './courseEditor/reducers';
import { courseBookReducer } from './courseBook/reducers';
import { userReducer } from './user/reducers';
import { searchReducer } from './search/reducers';

export const rootReducer = {
  notification: notificationReducer,
  tableList: timetableReducer,
  courseEditor: courseEditorReducer,
  courseBook: courseBookReducer,
  user: userReducer,
  search: searchReducer,
};

const combinedReducers = combineReducers(rootReducer);
export type AppState = ReturnType<typeof combinedReducers>;
