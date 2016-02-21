import React, { Component } from 'react'

export default class LectureBox extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.stopPropagation()
  }

  render() {
    var divStyle = {
      height: `${this.props.length * 100}%`
    }
    return (
      <div
        className={"course-div" + (this.props.isPreview ? " preview" : "")}
        style={divStyle}
        onClick={this.handleClick}
      >
        {this.props.course.course_title}
        {this.props.onDelete !== undefined ?
          <span className="glyphicon glyphicon-remove" aria-hidden="true"
            onClick={() => this.props.onDelete(this.props.course._id)}
          /> :
          null
        }
      </div>
    )
  }
}
