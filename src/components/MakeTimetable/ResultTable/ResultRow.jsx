import React, { Component } from 'react'

export default class ResultRow extends Component {
  render() {
    return(
      <tr
        onClick={this.props.handleSelect}
        className={this.props.isSelected ? 'info' : ''}
      >
        <td className='col-course-no'>{this.props.course_number}</td>
        <td className='col-lecture-no'>{this.props.lecture_number}</td>
        <td className='col-title'>
          {this.props.course_title}
          {this.props.isSelected ?
            <button type="button" className="btn btn-success" aria-label="Left Align" onClick={this.props.handleAdd}>
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
