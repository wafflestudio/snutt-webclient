import React, { Component } from 'react'
import { connect } from 'react-redux'

import { editCourse } from '../../../actions/tableActions'

class LectureBox extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.stopPropagation()
    console.log('lecture clicked');
  }

  render() {
    const { dispatch, length, course } = this.props
    if (!course.color)
      course.color = { fg: "#1579C2", bg: "#94E6FE" }
    const divStyle = {
      height: `${length * 100}%`,
      color: course.color.fg,
      backgroundColor: course.color.bg,
    }
    return (
      <div
        className={'course-div' + (this.props.isPreview ? ' preview' : '')}
        style={divStyle}
        onClick={this.handleClick}
      >
        <div className='title-box'>
          <p>{this.props.course.course_title}</p>
          <p>{this.props.classroom}</p>
        </div>
        <div className='tool-box'>
          {this.props.onDelete !== undefined ?
            <span
              className='glyphicon glyphicon-remove'
              aria-hidden='true'
              onClick={() => this.props.onDelete(this.props.course._id)}
            /> :
            null
          }
          {
          <span
            className='glyphicon glyphicon-pencil'
            aria-hidden='true'
            onClick={() => dispatch(editCourse(this.props.course))}
          />
          }
        </div>
      </div>
    )
  }
}

export default connect()(LectureBox)
