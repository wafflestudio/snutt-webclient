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
    let cssClass = 'tr-result'
    if (this.props.isSelected)
      cssClass += ' info'
    else if (this.props.hovereComputed)
      cssClass += ' hovered'

    return(
      <tr
        onClick={this.props.handleSelect}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className={cssClass}
      >
        <td className='col-course-no'>
          {this.props.course_number}
         </td>
        <td className='col-lecture-no'>{this.props.lecture_number}</td>
        <td className='col-title'>
          {this.props.course_title}
          {this.props.isSelected ?
            <button
              type="button"
              className="btn btn-success"
              aria-label="Left Align"
              onClick={this.props.handleAdd}
            >
              <span className="glyphicon glyphicon-plus" aria-hidden="true"/>
            </button> :
            null
          }
        </td>
        <td className='col-department'>{this.props.department}</td>
        <td className='col-time'>{this.props.class_time}</td>
        <td className='col-professor'>{this.props.professor}</td>
        <td className='col-remark'>{this.props.remark}</td>
      </tr>
    )
  }
}
