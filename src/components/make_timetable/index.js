import React, { Component } from 'react';
import SearchBar from './search-bar.jsx'
import SearchResult from './search-result.jsx'
import Timetable from './timetable.jsx'

import { selectCourse, sendQuery, showResult, addCourse } from '../../actions'

export default class MakeTimeTable extends Component {
  render() {
    const { dispatch, selectedCourse, searchResults, timeTable} = this.props
    return <div className="container">
      <SearchBar
        handleSearch={query => dispatch(sendQuery(query))}/>
      <SearchResult
        results={searchResults}
        onSelect={course => dispatch(selectCourse(course))}/>
      <Timetable courses={timeTable} selected={selectedCourse}/>
    </div>
  }
}
