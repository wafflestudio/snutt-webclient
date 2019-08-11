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

import { rootReducer } from './store';
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

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

require('stylesheets/style.scss');

const history = createHistory();

const reducer = combineReducers({
  ...rootReducer,
  routing: routerReducer,
});

const middleware = applyMiddleware(routerMiddleware(history), thunk);

export const store = createStore(
  reducer,
  compose(
    middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV !== 'production'
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f,
  ),
);
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
serviceWorker.register();
