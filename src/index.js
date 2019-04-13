import React from 'react';
import ReactDOM from 'react-dom';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
} from 'react-router-redux';
import thunk from 'redux-thunk';

import api from './middleware/api';
import rootReducer from './reducers';
import * as serviceWorker from './serviceWorker';

import {
  App,
  MakeTimetable,
  About,
  Login,
  SignUp,
  MyPage,
  FindPassword,
  withAuthCheck,
  Feedback,
} from './components';
import TableRenderer from 'components/MakeTimetable/Timetable/TableRenderer';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

require('stylesheets/style.scss');

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

require('stylesheets/style.scss');

const history = createHistory();

const reducer = combineReducers({
  ...rootReducer,
  routing: routerReducer,
});

const middleware = applyMiddleware(routerMiddleware(history), thunk, api);

export const store = createStore(
  reducer,
  compose(
    middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV !== 'production'
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f,
  ),
);

const RouteApp = () => (
  <App>
    <Switch>
      <Route exact path="/" component={MakeTimetable} />
      <Route exact path="/about" component={About} />
      <Route exact path="/login" component={withAuthCheck(Login, false)} />
      <Route exact path="/signup" component={withAuthCheck(SignUp, false)} />
      <Route exact path="/findPassword" component={FindPassword} />
      <Route exact path="/myPage" component={withAuthCheck(MyPage)} />
    </Switch>
  </App>
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/feedback" component={Feedback} />
        <Route path="/captureTable" component={TableRenderer} />
        <Route path="/" component={RouteApp} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  window.document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
