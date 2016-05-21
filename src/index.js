import React from 'react'
import { render } from 'react-dom'
import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

require('../stylesheets/style.scss')
import { App, MakeTimetable } from './components'

var reducer = combineReducers({
  ...rootReducer,
  routing: routerReducer,
})

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    (window.devToolsExtension && process.env.NODE_ENV != 'production') ? window.devToolsExtension() : f => f,
  )
)
const history = syncHistoryWithStore(browserHistory, store)

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={MakeTimetable} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))
