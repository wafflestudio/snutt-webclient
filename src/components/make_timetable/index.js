import React, { Component } from 'react';
import SearchBar from './SearchBar.jsx'
import ResultTable from './ResultTable.jsx'
import TimeTableManager from './TimeTableManager.jsx'
import NewCourseForm from './NewCourseForm.jsx'
import Timetable from './Timetable.jsx'

import { sendQuery, showResult,
  selectCourse, unselectCourse, addCourse, deleteCourse,
  changeTimeTable, addTimeTable, deleteTimeTable
} from '../../actions'

export default class MakeTimeTable extends Component {
  constructor() {
    super()
    this.state = {
      isAdding: false
    }
  }

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
        {this.state.isAdding ?
          <NewCourseForm /> :
          <TimeTableManager
            currentIndex={timeTables.currentIndex}
            total={timeTables.tables.size}
            handleChange={idx => dispatch(changeTimeTable(idx))}
            handleAdd={() => dispatch(addTimeTable())}
            handleDelete={idx => dispatch(deleteTimeTable(idx))}
          />
        }
        <Timetable
          courses={timeTables.tables.get(timeTables.currentIndex)}
          selected={selectedCourse}
          handleDelete={_id => dispatch(deleteCourse(_id))}
          toggleAdd={(bool) => this.setState({ isAdding: bool })}
        />
      </div>
    )
  }
}
