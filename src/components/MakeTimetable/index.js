import React, { Component } from 'react'
import { connect } from 'react-redux'

import Search from './Search'
import ModalWrapper from './Common/ModalWrapper.jsx'
import CourseEditor from './CourseEditor'
import ResultTable from './ResultTable'
import TimeTableManager from './Timetable/TimeTableManager.jsx'
import Timetable from './Timetable'

import { addCourse,
} from '../../actions'
import { deleteLecture, updateTitle, createTable, switchTable, deleteTable
  } from '../../actions/tableActions'

class MakeTimeTable extends Component {
  constructor() {
    super()
  }

  render() {
    const { dispatch, hoveredCourse, timeTables, modalOn, tableList: { tableIndex, currentId },
      currentLectures, currentIndex, courseBook } = this.props
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
              currentId={currentId}
              tables={tableIndex}
              handleChange={id => dispatch(switchTable(id))}
              handleAdd={title => dispatch(createTable(title))}
              handleDelete={id => dispatch(deleteTable(id))}
              handleTitleUpdate={title => dispatch(updateTitle(title))}
            />
            <Timetable
              currentIndex={currentIndex}
              courseBook={courseBook}
              courses={currentLectures || []}
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
    modalOn, tableList } = state
  const { currentId, tableMap } = tableList
  const currentLectures = currentId == null ? [] : tableMap[currentId].lecture_list
  return { hoveredCourse, searchResults, timeTables, courseBook, isQuerying,
    modalOn, tableList, currentLectures }
}

export default connect(mapStateToProps)(MakeTimeTable)
