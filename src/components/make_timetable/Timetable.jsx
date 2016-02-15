import React, { Component } from 'react'
import update from 'react-addons-update'

class LectureBox extends Component {
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

class Cell extends Component {
  constructor() {
    super()
  }

  onMouseDown() {
    console.log('down')
    this.props.handleMouseDown(this.props.day, this.props.time)
  }

  onMouseEnter() {
    this.props.handleMouseEnter(this.props.day, this.props.time)
  }

  onMouseUp() {
    this.props.handleMouseUp(this.props.day, this.props.time)
  }

  render() {
    return (
      <td
        className={this.props.className}
        onMouseDown={this.onMouseDown.bind(this)}
        onMouseEnter={this.onMouseEnter.bind(this)}
        onMouseUp={this.onMouseUp.bind(this)}
      >
        {this.props.content}
      </td>
    )
  }
}

function update2dArr(arr, row, col, newElement) {
  return update(arr, {[row]: {[col]: {$set: newElement}}})
}

export default class Timetable extends Component {
  constructor() {
    super()
    this.fillLectures = this.fillLectures.bind(this)
    this.state = {
      lectureBoxes: this.emptyArray(),
      cellStatus: this.emptyArray(),
      isSelecting: false,
      isDragSelecting: false,
      dragStart: {day: -1, time: -1},
      dragEnd: {day: -1, time: -1}
    }
  }

  emptyArray() {
    var empty = new Array(6)
    for (var d = 0; d < 6; d++) {
      empty[d] = new Array(26)
    }
    return empty
  }

  componentWillMount() {
    this.fillLectures(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.fillLectures(nextProps)
  }

  fillLectures(props) {
    var boxes = this.emptyArray()
    for (var course of props.courses) {
      for (var lecture of course.class_time_json) {
        var day = lecture.day
        boxes[day][lecture.start * 2] = (
          <LectureBox
            course={course}
            onDelete={this.props.handleDelete}
            length={lecture.len * 2}
            isPreview={false}
            key={course._id + day}
          />
        )
      }
    }
    var selected = props.selected
    if (selected) {
      for (var lecture of selected.class_time_json) {
        var day = lecture.day
        var previewDiv = (
          <LectureBox
            course={selected}
            length={lecture.len * 2}
            isPreview={true}
            key={selected._id + day}
          />
        )
        var existingDiv = boxes[day][lecture.start * 2]
        boxes[day][lecture.start * 2] = (
          existingDiv !== undefined ? [ existingDiv, previewDiv ] : previewDiv
        )
      }
    }
    this.setState({
      lectureBoxes: boxes
    })
  }

  makeTable() {
    var rows = [];
    for (var t = 0; t < 26; t++) {
      var cols = []
      for (var d = 0; d < 6; d++) {
        var cellStatus = this.state.cellStatus[d][t]
        var cellClass = ""
        if (cellStatus == 'SELECTED')
          cellClass += 'selected'
        if (this.state.dragStart.day <= d && d<= this.state.dragEnd.day &&
          this.state.dragStart.time <= t && t<= this.state.dragEnd.time) {
          cellClass += ' dragged'
        }
        cols.push(
          <Cell
            className={cellClass.trim()}
            // content={this.state.lectureBoxes[d][t]}
            content={d + ' ' + t + ' ' + cellClass}
            key={d}
            day={d}
            time={t}
            handleMouseDown={this.handleMouseDown.bind(this)}
            handleMouseEnter={this.handleMouseEnter.bind(this)}
            handleMouseUp={this.handleMouseUp.bind(this)}
          />
        )
      }
      rows.push(<tr key={t}>{cols}</tr>)
    }
    return <tbody>{rows}</tbody>
  }

  handleSelect(day, time) {
    console.log(day + ' ' + time)
    var newStatus = 'SELECTED'
    if (this.state.cellStatus[day][time] == 'SELECTED')
      newStatus = undefined

    this.setState({
      cellStatus: update(this.state.cellStatus, {
        [day]: { [time]: { $set: newStatus } }
      })
    })
  }

  handleMouseDown(day, time) {
    this.setState({
      isDragSelecting: true,
      dragStart: {day, time},
      dragEnd: {day, time}
    })
  }

  handleMouseEnter(day, time) {
    if (this.state.isDragSelecting) {
      this.setState({dragEnd: {day, time}})
    }
  }

  handleMouseUp(day, time) {
    var newStatus = this.state.cellStatus
    var start = this.state.dragStart
    var end = this.state.dragEnd
    var deleting = false;

    for (var d = start.day; d <= end.day; d++) {
      for (var t = start.time; t <= end.time; t++) {
        if (this.state.cellStatus[d][t] == 'SELECTED')
          deleting = true;
        newStatus = update2dArr(newStatus, d, t, (deleting ? undefined : 'SELECTED'))
      }
    }
    this.setState({
      isDragSelecting: false,
      cellStatus: newStatus,
      dragStart: {day: -1, time: -1},
      dragEnd: {day: -1, time: -1}
    })
  }

  render() {
    return (
      <table className="table table-bordered timetable">
        <thead>
          <tr>
            <th>{this.state.dragStart.day + ' ' + this.state.dragStart.time}</th>
            <th>{this.state.dragEnd.day + ' ' + this.state.dragEnd.time}</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        {this.makeTable()}
      </table>
    )
  }
}
