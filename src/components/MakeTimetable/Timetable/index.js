import React, { Component } from 'react';
import { connect } from 'react-redux';

import LectureBox from './LectureBox.jsx';
import TableHeader from './TableHeader.jsx';
import TableBody from './TableBody.jsx';

import { createCourse, deleteLecture } from '../../../actions/tableActions';
import { addCourse } from '../../../actions';

const NUM_SLOTS = 32;
const NUM_DAY = 7;

function mapStateToProps(state) {
  const { hoveredCourse: previewed, courseBook } = state;
  const { viewLectures: courses, viewTableId } = state.tableList;

  return {
    hasNoTable: viewTableId === null,
    previewed,
    courseBook,
    courses,
  };
}

const mapDispatchToProps = dispatch => ({
  handleDelete: _id => dispatch(deleteLecture(_id)),
  addCourse: course => dispatch(addCourse(course)),
  openCourse: () => dispatch(createCourse())
});

class Timetable extends Component {
  constructor() {
    super();
    this.placeLectures = this.placeLectures.bind(this);
    this.createAndEditCourse = this.createAndEditCourse.bind(this);
  }

  placeLectures() {
    const boxes = new Array(NUM_DAY).fill(0).map(() => new Array(NUM_SLOTS));
    for (const course of this.props.courses) {
      for (const lecture of course.class_time_json) {
        const day = lecture.day;
        boxes[day][lecture.start * 2] = (
          <LectureBox
            course={course}
            onDelete={this.props.handleDelete}
            length={lecture.len * 2}
            isPreview={false}
            classroom={lecture.place}
            key={`{course._id}{day}{lecture.start}{lecture.len}`}
          />
        );
      }
    }
    const previewed = this.props.previewed;
    if (previewed) {
      for (const lecture of previewed.class_time_json) {
        const day = lecture.day;
        const previewDiv = (
          <LectureBox
            course={previewed}
            length={lecture.len * 2}
            isPreview={true}
            key={previewed._id + day}
            classroom={lecture.place}
          />
        )
        const existingDiv = boxes[day][lecture.start * 2]
        boxes[day][lecture.start * 2] = (
          existingDiv !== undefined ? [existingDiv, previewDiv] : previewDiv
        );
      }
    }
    return boxes;
  }

  createAndEditCourse(e) {
    e.preventDefault();
    this.props.openCourse();
  }

  render() {
    const { hasNoTable } = this.props;
    let hasSunday = false;
    let lecturesInTable;
    if (!hasNoTable) {
      lecturesInTable = this.placeLectures();
      hasSunday = lecturesInTable[6].filter(v => Boolean(v)).length > 0;
    }

    return (
      <div id="timetable-container">
        <table className="table table-bordered timetable">
          <TableHeader hasSunday={hasSunday} />
          <TableBody
            hasNoTable={hasNoTable}
            hasSunday={hasSunday}
            lectureBoxes={lecturesInTable}
          />
        </table>
        <div id="add-button" onClick={this.createAndEditCourse}>
          <span>+</span>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timetable);
