import React, { Component } from 'react';
import SearchBar from './search-bar.jsx'
import ResultTable from './resultTable.jsx'
import Timetable from './timetable.jsx'

import { selectCourse, sendQuery, showResult, addCourse } from '../../actions'

export default class MakeTimeTable extends Component {
  render() {
    const { dispatch, selectedCourse, searchResults, timeTable} = this.props
    return <div className="container">
      <SearchBar
        handleSearch={query => dispatch(sendQuery(query))}/>
      <ResultTable
        height={200}
        data={searchResults}
        handleSelect={course => dispatch(selectCourse(course))}
        handleAdd={course => dispatch(addCourse(course))}/>
      <Timetable courses={timeTable} selected={selectedCourse}/>
    </div>
  }
}
