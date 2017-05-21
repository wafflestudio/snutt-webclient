import React from 'react';
import { render } from 'react-dom';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import api from './middleware/api';
import rootReducer from './reducers';

if (process.env.NODE_ENV != 'production') { window.Perf = require('react-addons-perf'); }

require('../stylesheets/style.scss');
import { App, MakeTimetable, About, Login, SignUp, MyPage, FindPassword, MustLoggedIn,
   } from './components';

const reducer = combineReducers({
  ...rootReducer,
  routing: routerReducer,
});

const middleware = applyMiddleware(
  routerMiddleware(browserHistory),
  thunk,
  api,
);

export const store = createStore(
  reducer,
  compose(
    middleware,
    (window.devToolsExtension && process.env.NODE_ENV != 'production') ? window.devToolsExtension() : f => f,
  ),
);

const history = syncHistoryWithStore(browserHistory, store);
render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={MakeTimetable} />
        <Route path="about" component={About} />
        <Route path="login" component={Login} />
        <Route path="signup" component={SignUp} />
        <Route path="findPassword" component={FindPassword} />
        <Route path="myPage" component={MustLoggedIn(MyPage)} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
