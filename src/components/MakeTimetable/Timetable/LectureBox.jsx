import React, { Component } from 'react'
import { connect } from 'react-redux'

import { openCourse } from '../../../actions'

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
    const { dispatch } = this.props
    const divStyle = {
      height: `${this.props.length * 100}%`,
      color: this.props.course.fgColor,
      backgroundColor: this.props.course.bgColor,
    }
    return (
      <div
        className={'course-div' + (this.props.isPreview ? ' preview' : '')}
        style={divStyle}
        onClick={this.handleClick}
      >
        <div className='title-box'>{this.props.course.course_title}</div>
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
          // <span
          //   className='glyphicon glyphicon-pencil'
          //   aria-hidden='true'
          //   onClick={() => dispatch(openCourse(this.props.course))}
          // />
          }
        </div>
      </div>
    )
  }
}

export default connect()(LectureBox)
