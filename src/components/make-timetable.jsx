import React, { Component } from 'react';
import Search from './search.jsx'
import Timetable from './timetable.jsx'

export default class MakeTimeTable extends Component {
  render() {
    return <div className="container">
      <Search result={this.props.searchResult}/>
      <Timetable courses={this.props.timeTable}/>
    </div>
  }
}
