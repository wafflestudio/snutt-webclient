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
        <td>
          <p className='time-string'>{this.props.course_number}</p>
          <p className='time-string'>{this.props.lecture_number}</p>
        </td>
        <td>{this.props.course_title}</td>
        <td>{this.props.credit}</td>
        <td><nobr>{this.props.department}</nobr></td>
        <td>{printTime(this.props.class_time)}</td>
        <td>{printPlace(this.props.class_time_json)}</td>
        <td>{this.props.instructor}</td>
        <td><nobr>{this.props.remark}</nobr></td>
      </tr>
    )
  }
}

const printTime = timeString => {
  let days = timeString.split('/').map(val => {
    try {
      const day = val.split('(')[0]
      const start = Number(val.split('(')[1].split('-')[0]) + 8
      return day + start
    } catch(ex) {
    }
  })
  return [...new Set(days)].join('-')
}

const printPlace = timeJson => (
  [...new Set(timeJson.map(val => Number(val.place.split('-')[0])))].join('&')
)
