import React, { Component } from 'react'

export default class ResultRow extends Component {
  constructor() {
    super()
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.state = { hovered: false }
  }

  handleMouseEnter() {
    this.props.updateHover(this.props.rowIndex)
    this.setState({ hovered: true })
  }

  handleMouseLeave() {
    this.props.updateHover(-1)
    this.setState({ hovered: false })
  }

  render() {
    const cssClass = `tr-result${this.props.hoverComputed ? ' hovered' : ''}`

    return(
      <tr
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className={cssClass}
      >
        <td className='col-course-no'>
          {this.props.course_number}
         </td>
        <td className='col-lecture-no'>{this.props.lecture_number}</td>
        <td className='col-title'>{this.props.course_title}</td>
        <td className='col-department'>{this.props.department}</td>
        <td className='col-time'>{this.props.class_time}</td>
        <td className='col-professor'>{this.props.professor}</td>
        <td className='col-remark'>{this.props.remark}</td>
      </tr>
    )
  }
}
