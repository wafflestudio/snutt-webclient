import React, { Component } from 'react'
import { connect } from 'react-redux'

import Search from './Search'
import ModalWrapper from './Common/ModalWrapper.jsx'
import CourseEditor from './CourseEditor'
import ResultTable from './ResultTable'
import TimeTableManager from './Timetable/TimeTableManager.jsx'
import Timetable from './Timetable'

import { addCourse, deleteCourse, changeTimeTable, addTimeTable, deleteTimeTable,
} from '../../actions'
import { deleteLecture, updateTitle } from '../../actions/tableActions'

class MakeTimeTable extends Component {
  constructor() {
    super()
  }

  render() {
    const { dispatch, hoveredCourse, timeTables, modalOn, tableList,
      currentTable, currentIndex, courseBook } = this.props
    return (
      <div className="container">
        <Search />
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
              currentIndex={currentIndex}
              titles={tableList.tables.map(val => val.title)}
              handleChange={idx => dispatch(changeTimeTable(idx))}
              handleAdd={() => dispatch(addTimeTable())}
              handleDelete={idx => dispatch(deleteTimeTable(idx))}
              handleTitleUpdate={title => dispatch(updateTitle(title))}
            />
            <Timetable
              currentIndex={currentIndex}
              courseBook={courseBook}
              courses={currentTable.lecture_list || []}
              previewed={hoveredCourse}
              handleDelete={_id => dispatch(deleteLecture(_id))}
              addCourse={course => dispatch(addCourse(course))}
            />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { hoveredCourse, searchResults, timeTables, courseBook, isQuerying,
    modalOn, tableList, tableList: { currentIndex } } = state
  const currentTable = tableList.tables[currentIndex]
  return { hoveredCourse, searchResults, timeTables, courseBook, isQuerying,
    modalOn, tableList, currentTable, currentIndex }
}

export default connect(mapStateToProps)(MakeTimeTable)
