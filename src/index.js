import React from 'react'
import { render } from 'react-dom'
import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { syncHistory, routeReducer } from 'redux-simple-router'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers/index.js'

require('../stylesheets/style.scss')
import { App, MakeTimetable, MyTimetable, ExportTimetable } from './components'


var combined = Object.assign({}, rootReducer, {
  routing: routeReducer
})

var reducer = combineReducers(combined)

const browserHistory = createBrowserHistory()
const reduxRouterMiddleware = syncHistory(browserHistory)
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  reduxRouterMiddleware
)(createStore)

const store = createStoreWithMiddleware(reducer)

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store)

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={MakeTimetable} />
        <Route path="my" component={MyTimetable} />
        <Route path="export" component={ExportTimetable} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))
