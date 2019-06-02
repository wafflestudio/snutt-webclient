import { combineReducers } from 'redux';
import { notificationReducer } from './notification/reducers';
import { timetableReducer } from './timetable/reducers';
import { courseEditorReducer } from './courseEditor/reducers';
import { courseBookReducer } from './courseBook/reducers';

const rootReducer = combineReducers({
  notification: notificationReducer,
  tableList: timetableReducer,
  courseEditor: courseEditorReducer,
  courseBook: courseBookReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
