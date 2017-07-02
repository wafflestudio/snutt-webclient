import React, { Component } from 'react'
import { connect } from 'react-redux';

import LectureBox from './LectureBox.jsx'
import Cell from './Cell.jsx'
import TableHeader from './TableHeader.jsx'

import { createCourse, deleteLecture } from '../../../actions/tableActions';
import { addCourse } from '../../../actions';


const NUM_SLOTS = 32

function mapStateToProps(state) {
  const { hoveredCourse: previewed, courseBook } = state;
  const { viewLectures:courses } = state.tableList;

  return {
    previewed,
    courseBook,
    courses
  };
}

const mapDispatchToProps = dispatch => ({
  handleDelete: _id => dispatch(deleteLecture(_id)),
  addCourse: course => dispatch(addCourse(course)),
  openCourse: () => dispatch(createCourse())
});

class Timetable extends Component {
  constructor() {
    super()
    this.placeLectures = this.placeLectures.bind(this)
    this.makeTable = this.makeTable.bind(this)
    this.createAndEditCourse = this.createAndEditCourse.bind(this)
  }

  emptyArray() {
    const NUM_DAY = 7
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
            key={`{course._id}{day}{lecture.start}{lecture.len}`}
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

  makeTable(lectureBoxes, hasSunday) {
    var rows = [];
    var numDay = hasSunday ? 7 : 6
    for (var t = 0; t < NUM_SLOTS; t++) {
      var cols = []
      //column
      if (t % 2 == 0) {
        var hrIdx = t/2;
        cols.push(<td className='label-gyosi' rowSpan='2' key={-2}>{hrIdx}</td>)
        cols.push(<td className='label-hour' rowSpan='2' key={-1}>{hrIdx+8}</td>)
      }
      for (var d = 0; d < numDay; d++) {
        cols.push(
          <Cell
            content={lectureBoxes[d][t]}
            key={d * NUM_SLOTS + t}
            day={d}
            time={t}
          />
        )
      }
      cols.push(<td className='blank-right' key={-3}></td>)
      rows.push(<tr key={t} className={t % 2 == 0 ? 'even' : 'odd'}>{cols}</tr>)
    }
    return <tbody>{rows}</tbody>
  }

  createAndEditCourse(e) {
    e.preventDefault()
    this.props.openCourse()
  }

  renderHead(hasSunday) {
    let days = ['월', '화', '수', '목', '금', '토']
    if (hasSunday) days.push('일')
    return (
      <thead>
        <tr>
          <th className='label-gyosi'></th>
          <th className='label-hour'></th>
          {days.map((v, i) => (<th className='label-date' key={i}>{v}</th>))}
          <th className='label-date blank-right'></th>
        </tr>
      </thead>
    )
  }

  render() {
    let hasSunday = false;
    let tableContent;
    if (this.props.courses) {
      const lectures = this.placeLectures()
      hasSunday = lectures[6].filter(v => Boolean(v)).length > 0
      tableContent = this.makeTable(lectures, hasSunday)
    } else {
      tableContent = (
        <tbody>
          <tr>
            <td colSpan='10'><h3 style={{textAlign:'center'}}>시간표를 추가해주세요</h3></td>
          </tr>
        </tbody>
      )
    }

    return (
      <div id='timetable-container'>
        <table className="table table-bordered timetable">
          <TableHeader hasSunday={hasSunday} />
          {tableContent}
        </table>
        <div id='add-button' onClick={this.createAndEditCourse}>
          <span>+</span>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timetable);
