import React, { Component } from 'react'
import { connect } from 'react-redux'

import Search from './Search'
import CourseEditorLoader from './CourseEditor/Loader'
import ResultTable from './ResultTable'
import TimeTableManager from './Timetable/TimeTableManager.jsx'
import Timetable from './Timetable'

import { addCourse } from '../../actions'
import { deleteLecture, updateTitle, createTable, switchTable, deleteTable
  } from '../../actions/tableActions'

class MakeTimeTable extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    CourseEditorLoader().then(loaded => {
      console.log('course editor loaded')
      this.CourseEditor = loaded.CourseEditor.default
      this.forceUpdate();
    })
  }

  render() {
    const { dispatch, hoveredCourse, timeTables, tableList: { tableIndex, currentId },
      currentLectures, currentIndex, courseBook, courseEditorOpen } = this.props

    return (
      <div className="container">
        <Search />
        <div className="row">
          <div className="col-lg-6">
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
              courses={currentLectures}
              previewed={hoveredCourse}
              handleDelete={_id => dispatch(deleteLecture(_id))}
              addCourse={course => dispatch(addCourse(course))}
            />
          </div>
          { courseEditorOpen ? <this.CourseEditor /> : null }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { hoveredCourse, searchResults, timeTables, courseBook, isQuerying,
    modalOn, tableList, courseEditor } = state
  const { currentId, tableMap } = tableList
  const currentLectures = currentId == null ? null : tableMap[currentId].lecture_list
  return {
    hoveredCourse, searchResults, timeTables, courseBook, isQuerying,
    modalOn, tableList, currentLectures, courseEditorOpen: courseEditor.isOpen
  }
}

export default connect(mapStateToProps)(MakeTimeTable)
