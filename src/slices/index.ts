import { routerReducer } from 'react-router-redux';
import { combineReducers, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

import courseEditor from './courseEditor';
import courseBook from './coursebook';
import notification from './notification';
import ui from './ui';
import user from './user';
import search from './search';
import { tableList } from 'reducers/timetables';

const rootReducer = combineReducers({
  search,
  courseBook,
  user,
  tableList,
  courseEditor,
  notification,
  ui,
  routing: routerReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
