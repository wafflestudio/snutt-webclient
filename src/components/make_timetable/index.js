import React, { Component } from 'react';
import SearchBar from './SearchBar.jsx'
import ResultTable from './ResultTable.jsx'
import TimeTableSelector from './TimetableSelector.jsx'
import Timetable from './Timetable.jsx'

import { selectCourse, unselectCourse, sendQuery, showResult, changeTimeTable, addCourse, deleteCourse } from '../../actions'

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
          handleDelete={_id => dispatch(deleteCourse(_id))}
        />
      </div>
    )
  }
}
