import React, { Component } from 'react'
import update from 'react-addons-update'
import LectureBox from './LectureBox.jsx'
import Cell from './Cell.jsx'
import NewCourseForm from './NewCourseForm.jsx'

function update2dArr(arr, row, col, newElement) {
  return update(arr, {[row]: {[col]: {$set: newElement}}})
}

function getLoHi(dragInit, dragEnd) {
  return {
    lo: {
      day: Math.min(dragInit.day, dragEnd.day),
      time: Math.min(dragInit.time, dragEnd.time)
    },
    hi: {
      day: Math.max(dragInit.day, dragEnd.day),
      time: Math.max(dragInit.time, dragEnd.time)
    }
  }
}

export default class Timetable extends Component {
  constructor() {
    super()
    this.placeLectures = this.placeLectures.bind(this)
    this.resetDrag = this.resetDrag.bind(this)
    this.state = {
      cellStatus: this.emptyArray(),
      isSelecting: false,
      isDragSelecting: false,
      dragInit: {day: -1, time: -1},
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

  componentWillReceiveProps(nextProps) {
    if (this.props.currentIndex != nextProps.currentIndex)
      this.resetDrag()
  }

  placeLectures() {
    var boxes = this.emptyArray()
    for (var course of this.props.courses) {
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
    var selected = this.props.selected
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
    return boxes
  }

  makeTable() {
    var lectureBoxes = this.placeLectures()
    var rows = [];
    for (var t = 0; t < 26; t++) {
      var cols = []
      //column
      if (t % 2 == 0) {
        var hrIdx = t/2;
        cols.push(<td className='label-hour' rowSpan='2' key={-1}>{hrIdx+8}</td>)
        cols.push(<td className='label-gyosi' rowSpan='2' key={-2}>{hrIdx}</td>)
      }
      for (var d = 0; d < 6; d++) {
        var cellStatus = this.state.cellStatus[d][t]
        var cellClass = "td-body"
        if (cellStatus == 'SELECTED')
          cellClass += ' selected'
        var loHi = getLoHi(this.state.dragInit, this.state.dragEnd)
        if (loHi.lo.day <= d && d<= loHi.hi.day &&
          loHi.lo.time <= t && t<= loHi.hi.time) {
          cellClass += ' dragged'
        }

        cols.push(
          <Cell
            className={cellClass.trim()}
            content={lectureBoxes[d][t]}
            // content={d + ' ' + t + ' ' + cellClass}
            key={d}
            day={d}
            time={t}
            handleMouseDown={this.handleMouseDown.bind(this)}
            handleMouseEnter={this.handleMouseEnter.bind(this)}
            handleMouseUp={this.handleMouseUp.bind(this)}
          />
        )
      }
      cols.push(<td className='blank-right' key={-3}></td>)
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
      isSelecting: true,
      isDragSelecting: true,
      dragInit: {day, time},
      dragEnd: {day, time},
    })
  }

  handleMouseEnter(day, time) {
    if (this.state.isDragSelecting) {
      this.setState({
        dragEnd: { day, time }
      })
    }
  }

  handleMouseUp(day, time) {
    var newStatus = this.state.cellStatus
    var loHi = getLoHi(this.state.dragInit, this.state.dragEnd)
    var deleting = this.state.cellStatus[this.state.dragInit.day][this.state.dragInit.time] == 'SELECTED'

    for (var d = loHi.lo.day; d <= loHi.hi.day; d++) {
      for (var t = loHi.lo.time; t <= loHi.hi.time; t++) {
        newStatus = update2dArr(newStatus, d, t, (deleting ? undefined : 'SELECTED'))
      }
    }
    this.setState({
      isDragSelecting: false,
      cellStatus: newStatus,
      dragInit: {day: -1, time: -1},
      dragEnd: {day: -1, time: -1}
    })
  }

  resetDrag() {
    this.setState({
      isSelecting: false,
      isDragSelecting: false,
      cellStatus: this.emptyArray(),
      dragInit: {day: -1, time: -1},
      dragEnd: {day: -1, time: -1}
    })
  }

  render() {
    return (
      <div id='timetable-container'>
        {this.state.isSelecting ?
          <NewCourseForm
            currentCourseBook={this.props.courseBook}
            cellStatus={this.state.cellStatus}
            addCourse={this.props.addCourse}
            stopAdding={()=>this.resetDrag()}
          /> :
          null
        }
        <table className="table table-bordered timetable">
          <thead>
            <tr>
              <th className='label-hour'></th>
              <th className='label-gyosi'></th>
              <th className='label-date'>월</th>
              <th className='label-date'>화</th>
              <th className='label-date'>수</th>
              <th className='label-date'>목</th>
              <th className='label-date'>금</th>
              <th className='label-date'>토</th>
              <th className='label-date blank-right'></th>
            </tr>
          </thead>
          {this.makeTable()}
        </table>
      </div>
    )
  }
}
