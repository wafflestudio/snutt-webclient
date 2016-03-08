import React, { Component } from 'react';
import { connect } from 'react-redux'

import SearchBar from './SearchBar.jsx'
import SearchFilter from './SearchFilter.jsx'
import ResultTable from './ResultTable.jsx'
import TimeTableManager from './TimeTableManager.jsx'
import NewCourseForm from './NewCourseForm.jsx'
import Timetable from './Timetable.jsx'

import { sendQuery, showResult,
  selectCourse, unselectCourse, addCourse, deleteCourse,
  changeTimeTable, addTimeTable, deleteTimeTable
} from '../../actions'

class MakeTimeTable extends Component {
  constructor() {
    super()
    this.composeQuery = this.composeQuery.bind(this)
  }

  composeQuery(query) {
    const { dispatch, courseBook } = this.props
    dispatch(sendQuery(Object.assign(query, {
      year: courseBook.year,
      semester: courseBook.semesterIdx
    })))
  }

  render() {
    const { dispatch, selectedCourse, searchResults, timeTables, isQuerying } = this.props
    return (
      <div className="container">
        <SearchBar
          handleSearch={query => this.composeQuery(query)}
        />
        <SearchFilter />
        <ResultTable
          height={200}
          data={searchResults}
          isQuerying={isQuerying}
          handleSelect={course => dispatch(selectCourse(course))}
          handleUnselect={() => dispatch(unselectCourse())}
          handleAdd={course => dispatch(addCourse(course))}
        />
        <TimeTableManager
          currentIndex={timeTables.currentIndex}
          total={timeTables.tables.size}
          handleChange={idx => dispatch(changeTimeTable(idx))}
          handleAdd={() => dispatch(addTimeTable())}
          handleDelete={idx => dispatch(deleteTimeTable(idx))}
        />
        <Timetable
          currentIndex={timeTables.currentIndex}
          courseBook={this.props.courseBook}
          courses={timeTables.tables.get(timeTables.currentIndex)}
          selected={selectedCourse}
          handleDelete={_id => dispatch(deleteCourse(_id))}
          addCourse={course => dispatch(addCourse(course))}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { selectedCourse, searchResults, timeTables, courseBook, isQuerying } = state
  return { selectedCourse, searchResults, timeTables, courseBook, isQuerying }
}

export default connect(mapStateToProps)(MakeTimeTable)