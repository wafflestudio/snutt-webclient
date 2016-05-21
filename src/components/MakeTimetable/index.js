import React, { Component } from 'react'
import { connect } from 'react-redux'

import SearchBar from './Search/SearchBar.jsx'
import SearchFilter from './Search/SearchFilter.jsx'
import ModalWrapper from './Common/ModalWrapper.jsx'
import CourseEditor from './CourseEditor'
import ResultTable from './ResultTable'
import TimeTableManager from './Timetable/TimeTableManager.jsx'
import Timetable from './Timetable'

import { sendQuery, addCourse, deleteCourse, changeTimeTable, addTimeTable, deleteTimeTable,
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
      semester: courseBook.semesterIdx,
    })))
  }

  render() {
    const { dispatch, selectedCourse, timeTables, filterOn, modalOn } = this.props
    return (
      <div className="container">
        <SearchBar
          handleSearch={query => this.composeQuery(query)}
        />
        <SearchFilter on={filterOn} />
        <div className="row">
          <div className="col-lg-6">
            { modalOn ?
              <ModalWrapper>
                <CourseEditor />
              </ModalWrapper>:
              null
            }
            <ResultTable />
          </div>
          <div className="col-lg-6">
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
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { selectedCourse, searchResults, timeTables, courseBook, isQuerying, filterOn, modalOn } = state
  return { selectedCourse, searchResults, timeTables, courseBook, isQuerying, filterOn, modalOn }
}

export default connect(mapStateToProps)(MakeTimeTable)
