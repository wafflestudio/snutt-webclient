// import { chatReducer } from './chat/reducers'
import { combineReducers } from 'redux';
import { notificationReducer } from './notification/reducers';

const rootReducer = combineReducers({
  notification: notificationReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
