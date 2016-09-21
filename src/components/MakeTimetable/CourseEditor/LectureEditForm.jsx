import React, { Component } from 'react'
import { connect } from 'react-redux'

import { closeCourse } from '../../../actions'

class LectureEditForm extends Component {
  constructor() {
    super()
    this.handleSave = this.handleSave.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleProfChange = this.handleProfChange.bind(this)
    this.handleRemarkChange = this.handleRemarkChange.bind(this)
  }

  handleSave(e) {
    e.stopPropagation()
    this.props.dispatch(closeCourse(true, this.props.course))
  }

  handleClose(e) {
    e.stopPropagation()
    this.props.dispatch(closeCourse(false))
  }

  handleProfChange(e) {
    this.props.updateCourse({ instructor: e.target.value })
  }

  handleRemarkChange(e) {
    this.props.updateCourse({ remark: e.target.value })
  }

  shouldComponentUpdate(nextProps) {
    return (
      (nextProps.course.instructor != this.props.course.instructor) ||
      (nextProps.course.remark != this.props.course.remark)
    )
  }

  render() {
    let { course } = this.props
    return(
      <form className='form-horizontal'>
        <div className='form-group'>
          <label className='col-sm-2 col-sm-offset-1'>
            교수님
          </label>
          <div className='col-sm-4'>
            <input
              className='form-control'
              value={course.instructor}
              onChange={this.handleProfChange}
            />
          </div>
        </div>
        <div className='form-group'>
          <label className='col-sm-2 col-sm-offset-1'>
            메모
          </label>
          <div className='col-sm-8'>
            <textarea
              className='form-control'
              rows='3'
              value={course.remark}
              onChange={this.handleRemarkChange}
            />
          </div>
        </div>
        <div className='form-group'>
          <div
            className='col-sm-offset-3 col-sm-9'
            style={{'textAlign': 'left'}}
          >
            <button
              className='btn btn-primary'
              onClick={this.handleSave}
            >
              수정
            </button>
            <span> </span>
            <button
              className='btn btn-default'
              onClick={this.handleClose}
            >
              취소
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default connect()(LectureEditForm)
