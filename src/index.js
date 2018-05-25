import React from "react";
import { render } from "react-dom";
import { compose, createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import createHistory from "history/createBrowserHistory";
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
  push
} from "react-router-redux";
import thunk from "redux-thunk";

import api from "./middleware/api";
import rootReducer from "./reducers";

if (process.env.NODE_ENV != "production") {
  console.log("Looks like we are in development mode!");
}

require("../stylesheets/style.scss");

import {
  App,
  MakeTimetable,
  About,
  Login,
  SignUp,
  MyPage,
  FindPassword,
  MustLoggedIn,
  Feedback
} from "./components";

const history = createHistory();

const reducer = combineReducers({
  ...rootReducer,
  routing: routerReducer
});

const middleware = applyMiddleware(routerMiddleware(history), thunk, api);

export const store = createStore(
  reducer,
  compose(
    middleware,
    window.devToolsExtension && process.env.NODE_ENV != "production"
      ? window.devToolsExtension()
      : f => f
  )
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

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/feedback" component={Feedback} />
        <Route path="/" component={RouteApp} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
