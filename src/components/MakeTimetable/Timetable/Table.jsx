import React, { Component } from 'react';

import LectureBox from './LectureBox.jsx';
import TableHeader from './TableHeader.jsx';
import TableBody from './TableBody.jsx';

const NUM_SLOTS = 32;
const NUM_DAY = 7;

class Table extends Component {
  createLectureBoxes() {
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
            key={'{course._id}{day}{lecture.start}{lecture.len}'}
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
            isPreview
            key={previewed._id + day}
            classroom={lecture.place}
          />
        );
        const existingDiv = boxes[day][lecture.start * 2];
        boxes[day][lecture.start * 2] =
          existingDiv !== undefined ? [existingDiv, previewDiv] : previewDiv;
      }
    }
    return boxes;
  }

  render() {
    const { hasNoTable } = this.props;
    let hasSunday = false;
    let lectureBoxes;
    if (!hasNoTable) {
      lectureBoxes = this.createLectureBoxes();
      hasSunday = lectureBoxes[6].filter(v => Boolean(v)).length > 0;
    }

    return (
      <table className="table timetable">
        <TableHeader hasSunday={hasSunday} />
        <TableBody
          hasNoTable={hasNoTable}
          hasSunday={hasSunday}
          lectureBoxes={lectureBoxes}
        />
      </table>
    );
  }
}

export default Table;
