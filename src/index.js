import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
require('../stylesheets/style.scss')

import { App, MakeTimetable, MyTimetable, ExportTimetable } from './components'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={MakeTimetable} />
      <Route path="my" component={MyTimetable} />
      <Route path="export" component={ExportTimetable} />
    </Route>
  </Router>
), document.getElementById('root'))
