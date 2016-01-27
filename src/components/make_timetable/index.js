import React, { Component } from 'react';
import SearchBar from './search-bar.jsx'
import ResultTable from './resultTable.jsx'
import TimeTableSelector from './timeTableSelector.jsx'
import Timetable from './timetable.jsx'

import { selectCourse, unselectCourse, sendQuery, showResult, changeTimeTable, addCourse } from '../../actions'

export default class MakeTimeTable extends Component {
  render() {
    const { dispatch, selectedCourse, searchResults, timeTables} = this.props
    return (
      <div className="container">
        <SearchBar
          handleSearch={query => dispatch(sendQuery(query))}
        />
        <ResultTable
          height={200}
          data={searchResults}
          handleSelect={course => dispatch(selectCourse(course))}
          handleUnselect={() => dispatch(unselectCourse())}
          handleAdd={course => dispatch(addCourse(course))}
        />
        <TimeTableSelector
          currentIndex={timeTables.currentIndex}
          total={timeTables.tables.size}
          handleChange={idx => dispatch(changeTimeTable(idx))}
        />
        <Timetable
          courses={timeTables.tables.get(timeTables.currentIndex)}
          selected={selectedCourse}
        />
      </div>
    )
  }
}
