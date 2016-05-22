import React from 'react'
import { connect } from 'react-redux'

import ResultRow from './ResultRow.jsx'
import { addCourse, deleteCourse, openCourse } from '../../../actions'
import showCourseDetail from './showCourseDetail.js'

class DetailRow extends ResultRow {
  constructor() {
    super()
    this.handleAdd = this.handleAdd.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleOpenDetail = this.handleOpenDetail.bind(this)
  }

  handleAdd() {
    this.props.dispatch(addCourse(this.props.course))
  }

  handleOpenDetail() {
    const { year, semesterStr } = this.props
    const { course_number, lecture_number } = this.props.course
    showCourseDetail(year, semesterStr, course_number, lecture_number)
  }

  handleDelete() {
    this.props.updateHover(-1)
    this.props.dispatch(deleteCourse(this.props.course._id))
  }

  handleEdit() {
    this.props.dispatch(openCourse(this.props.course))
  }

  render() {
    const { searching } = this.props
    return (
      <tr
        className='tr-detail'
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <td colSpan='7'>
          <span>{this.props.course.course_title}</span>
          { searching ?
            <div className='buttons'>
              <button
                className="btn btn-info"
                onClick={this.handleOpenDetail}
              >
                수강편람
              </button>
              <button
                className='btn btn-primary'
                onClick={this.handleAdd}
              >
                추가
              </button>
            </div> :
            <div className='buttons'>
            <button className="btn btn-info">수강편람</button>
              <button
                className='btn btn-warning'
                onClick={this.handleEdit}
              >
                수정
              </button>
              <button
                className='btn btn-danger'
                onClick={this.handleDelete}
              >
                삭제
              </button>
            </div>
          }
        </td>
      </tr>
    )
  }
}

function mapStateToProps(state) {
  const { year, semesterIdx } = state.courseBook
  const semesterStr = [, '1', 'S', '2', 'W'][semesterIdx]
  return { searching: state.leftTabSearching, year, semesterStr }
}

export default connect(mapStateToProps)(DetailRow)
