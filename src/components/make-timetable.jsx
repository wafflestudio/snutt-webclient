import React, { Component } from 'react';
import SearchBar from './search-bar.jsx'
import SearchResult from './search-result.jsx'
import Timetable from './timetable.jsx'

export default class MakeTimeTable extends Component {
  render() {
    return <div className="container">
      <SearchBar />
      <SearchResult results={this.props.searchResult}/>
      <Timetable courses={this.props.timeTable}/>
    </div>
  }
}
