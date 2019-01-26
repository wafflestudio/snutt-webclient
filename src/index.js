import React from 'react';
<<<<<<< HEAD
import ReactDOM from 'react-dom';
=======
import { render } from 'react-dom';
>>>>>>> 7b0e19d... Move stylesheets inside src
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
  MustLoggedIn,
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

const middleware = applyMiddleware(routerMiddleware(history), thunk, api);

export const store = createStore(
  reducer,
  compose(
    middleware,
    window.devToolsExtension && process.env.NODE_ENV !== 'production'
      ? window.devToolsExtension()
      : f => f,
  ),
);

const RouteApp = () => (
  <App>
    <Switch>
      <Route exact path="/" component={MakeTimetable} />
      <Route exact path="/about" component={About} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/findPassword" component={FindPassword} />
      <Route exact path="/myPage" component={MustLoggedIn(MyPage)} />
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
