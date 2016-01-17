import React from 'react'
import { render } from 'react-dom'
import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { syncHistory, routeReducer } from 'redux-simple-router'
import reducers from './reducers'

require('../stylesheets/style.scss')
import { App, MakeTimetable, MyTimetable, ExportTimetable } from './components'

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}))

const browserHistory = createBrowserHistory()
const reduxRouterMiddleware = syncHistory(browserHistory)
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore)

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
