// import { chatReducer } from './chat/reducers'
import { combineReducers } from 'redux';
import { notificationReducer } from './notification/reducers';
import { timetableReducer } from './timetable/reducers';

const rootReducer = combineReducers({
  notification: notificationReducer,
  tableList: timetableReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
