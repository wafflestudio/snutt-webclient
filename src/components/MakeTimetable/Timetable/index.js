import React, { Component } from 'react'

import LectureBox from './LectureBox.jsx'
import Cell from './Cell.jsx'

const NUM_DAY = 7
const NUM_SLOTS = 28

export default class Timetable extends Component {
  constructor() {
    super()
    this.placeLectures = this.placeLectures.bind(this)
  }

  emptyArray() {
    var empty = new Array(NUM_DAY)
    for (var d = 0; d < NUM_DAY; d++) {
      empty[d] = new Array(NUM_SLOTS)
    }
    return empty
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
            classroom={lecture.place}
            key={course._id + day}
          />
        )
      }
    }
    var previewed = this.props.previewed
    if (previewed) {
      for (var lecture of previewed.class_time_json) {
        var day = lecture.day
        var previewDiv = (
          <LectureBox
            course={previewed}
            length={lecture.len * 2}
            isPreview={true}
            key={previewed._id + day}
            classroom={lecture.place}
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

  makeTable(lectureBoxes) {
    var rows = [];
    for (var t = 0; t < NUM_SLOTS; t++) {
      var cols = []
      //column
      if (t % 2 == 0) {
        var hrIdx = t/2;
        cols.push(<td className='label-hour' rowSpan='2' key={-1}>{hrIdx+8}</td>)
        cols.push(<td className='label-gyosi' rowSpan='2' key={-2}>{hrIdx}</td>)
      }
      for (var d = 0; d < NUM_DAY; d++) {
        var cellClass = 'td-body'

        cols.push(
          <Cell
            className={cellClass.trim()}
            content={lectureBoxes[d][t]}
            key={d}
            day={d}
            time={t}
            handleMouseDown={this.handleMouseDown}
            handleMouseEnter={this.handleMouseEnter}
            handleMouseUp={this.handleMouseUp}
          />
        )
      }
      cols.push(<td className='blank-right' key={-3}></td>)
      rows.push(<tr key={t} className={t % 2 == 0 ? 'even' : 'odd'}>{cols}</tr>)
    }
    return <tbody>{rows}</tbody>
  }

  render() {
    var lectureBoxes = this.placeLectures()
    return (
      <div id='timetable-container'>
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
              <th className='label-date'>일</th>
              <th className='label-date blank-right'></th>
            </tr>
          </thead>
          {this.makeTable(lectureBoxes)}
        </table>
      </div>
    )
  }
}

function mapStateToProps(state) {

}
