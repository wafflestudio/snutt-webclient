import { routerReducer } from 'react-router-redux';
import { combineReducers } from '@reduxjs/toolkit';

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
