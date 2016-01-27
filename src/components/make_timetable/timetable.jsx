import React, { Component } from 'react'

class CourseDiv extends Component {
  render() {
    var divStyle = {
      height: `${this.props.length * 100}%`
    }
    return <div className={"course-div" + (this.props.isPreview ? " preview" : "")} style={divStyle}>
      {this.props.title}
    </div>
  }
}

export default class Timetable extends Component {
  constructor() {
    super()
    this.fillCells = this.fillCells.bind(this)
    this.countCells = this.countCells.bind(this)
    this.state = {
      cells: this.emptyCells()
    }
  }

  emptyCells() {
    var empty = new Array(6)
    for (var d = 0; d < 6; d++) {
      empty[d] = new Array(26)
    }
    return empty
  }

  componentWillMount() {
    this.fillCells(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.fillCells(nextProps)
  }

  fillCells(props) {
    var newCells = this.emptyCells()
    for (var course of props.courses) {
      for (var lecture of course.class_time_json) {
        var day = lecture.day
        newCells[day][lecture.start * 2] = <CourseDiv
          title={course.course_title}
          length={lecture.len * 2}
          isPreview={false} />
      }
    }
    var selected = props.selected
    if (selected) {
      for (var lecture of selected.class_time_json) {
        var day = lecture.day
        var previewDiv = (
          <CourseDiv
            title={selected.course_title}
            length={lecture.len * 2}
            isPreview={true}
          />
        )
        var existingDiv = newCells[day][lecture.start * 2]
        newCells[day][lecture.start * 2] = (
          existingDiv !== undefined ? [ existingDiv, previewDiv ] : previewDiv
        )
      }
    }
    this.setState({
      cells: newCells
    })
  }

  render() {
    return <table className="table table-bordered timetable">
      <thead>
        <tr>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
        </tr>
      </thead>
      {this.drawTable()}
    </table>
  }

  drawTable() {
    var rows = [];
    for (var t = 0; t < 26; t++) {
      rows.push(<tr key={t}>
        <td>{this.state.cells[0][t]}</td>
        <td>{this.state.cells[1][t]}</td>
        <td>{this.state.cells[2][t]}</td>
        <td>{this.state.cells[3][t]}</td>
        <td>{this.state.cells[4][t]}</td>
        <td>{this.state.cells[5][t]}</td>
      </tr>)
    }
    return <tbody>{rows}</tbody>
  }
}
