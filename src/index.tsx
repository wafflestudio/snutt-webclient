import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import rootReducer from 'slices';
import * as serviceWorker from './serviceWorker';
import {
  App,
  MakeTimetable,
  Login,
  SignUp,
  MyPage,
  FindPassword,
  withAuthCheck,
  Feedback,
} from './components';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
    Cypress: any;
    store: any;
  }
}

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

require('stylesheets/style.scss');

const history = createHistory();

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), routerMiddleware(history)],
});

if (window.Cypress) {
  console.log("It seems I'm under Cypress");
  window.store = store;
  console.log(window.store);
}

const RouteApp = () => (
  <App>
    <Switch>
      <Route exact path="/" component={MakeTimetable} />
      <Route exact path="/login" component={withAuthCheck(Login, false)} />
      <Route exact path="/signup" component={withAuthCheck(SignUp, false)} />
      <Route exact path="/findPassword" component={FindPassword} />
      <Route exact path="/myPage" component={withAuthCheck(MyPage)} />
    </Switch>
  </App>
);

ReactDOM.render(
  // @ts-ignore
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/feedback" component={Feedback} />
        <Route path="/" component={RouteApp} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  window.document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
