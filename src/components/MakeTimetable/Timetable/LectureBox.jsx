import React, { Component } from 'react'
import { connect } from 'react-redux'

import { editCourse } from '../../../actions/tableActions'

import { tableHoverCourse, tableUnhoverCourse } from '../../../actions';

function mapStateToProps(state) {
  const { tableHoveredCourse } = state;
  
  return {
    tableHoveredCourse
  };
}

const mapDispatchToProps = dispatch => ({
  onHover: course => dispatch(tableHoverCourse(course)),
  onUnhover: () => dispatch(tableUnhoverCourse()),
});

class LectureBox extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.stopPropagation()
    console.log('lecture clicked');
  }

  handleMouseEnter = (e) => {
    this.props.onHover(this.props.course);
  }
  handleMouseLeave = (e) => {
    this.props.onUnhover();
  }

  render() {
    const { dispatch, length, course, isPreview } = this.props
    const isHovered = (this.props.tableHoveredCourse) ? this.props.tableHoveredCourse._id === this.props.course._id : false;
    if (!course.color)
      course.color = { fg: "#1579C2", bg: "#94E6FE" }
    const divStyle = {
      height: `${length * 20}px`,
      color: course.color.fg,
      backgroundColor: course.color.bg,
    }
    return (
      <div
        className={'course-div' +
          (isPreview ? ' preview' : '') +
          (isHovered ? ' hovered' : '')}
        style={divStyle}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className='title-box'>
          <p>{this.props.course.course_title}</p>
          <p><strong>{this.props.classroom}</strong></p>
        </div>
        <div className='tool-box-wrapper'>
          <div
            className='tool-box'
            style={{ color: course.color.bg }}
          >
            <span
              className='glyphicon glyphicon-pencil'
              aria-hidden='true'
              onClick={() => dispatch(editCourse(this.props.course))}
            />
            {this.props.onDelete !== undefined ?
              <span
                className='glyphicon glyphicon-remove'
                aria-hidden='true'
                onClick={() => {
                  if (confirm("정말로 삭제하시겠습니까?")) this.props.onDelete(this.props.course._id) 
                  }}
              /> :
              null
            }

          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LectureBox)
