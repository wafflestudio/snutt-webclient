import { combineReducers } from 'redux';
import { notificationReducer } from './notification/reducers';
import { timetableReducer } from './timetable/reducers';
import { courseEditorReducer } from './courseEditor/reducers';

const rootReducer = combineReducers({
  notification: notificationReducer,
  tableList: timetableReducer,
  courseEditor: courseEditorReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
