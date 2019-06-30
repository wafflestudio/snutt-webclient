import { combineReducers } from 'redux';
import { notificationReducer } from './notification/reducers';
import { timetableReducer } from './timetable/reducers';
import { courseEditorReducer } from './courseEditor/reducers';
import { courseBookReducer } from './courseBook/reducers';
import { userReducer } from './user/reducers';
import { searchReducer } from './search/reducers';

const rootReducer = combineReducers({
  notification: notificationReducer,
  tableList: timetableReducer,
  courseEditor: courseEditorReducer,
  courseBook: courseBookReducer,
  user: userReducer,
  search: searchReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
