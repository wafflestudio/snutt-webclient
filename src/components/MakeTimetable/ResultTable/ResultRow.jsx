import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResultRowDetail from './ResultRowDetail.jsx';

import { hoverCourse, unhoverCourse } from '../../../actions';
import { tableHoverCourse, tableUnhoverCourse } from '../../../actions';

const mapDispatchToProps = dispatch => ({
  onHoverCourse: course => dispatch(hoverCourse(course)),
  onUnhoverCourse: () => dispatch(unhoverCourse()),
  onTableHover: course => dispatch(tableHoverCourse(course)),
  onTableUnhover: () => dispatch(tableUnhoverCourse()),
});

class ResultRow extends Component {
  constructor() {
    super();
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.state = { hovered: false };
  }

  handleMouseEnter() {
    this.setState({ hovered: true });
    if (this.props.searching) this.props.onHoverCourse(this.props.lecture);
    else this.props.onTableHover(this.props.lecture);
  }

  handleMouseLeave() {
    this.setState({ hovered: false });
    if (this.props.searching) this.props.onUnhoverCourse();
    else this.props.onTableUnhover();
  }

  render() {
    const cssClass = `tr-result${this.state.hovered ? ' hovered' : ''}`;
    const lecture = this.props.lecture;

    return (
      <tr
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className={cssClass}
      >
        <td>
          <h5 className="title">{lecture.course_title}</h5>
          <h5 className="pull-right">{lecture.instructor} / {lecture.credit}학점</h5>
          {/* <h5 className="pull-right">{lecture.course_number} / {lecture.lecture_number}</h5> */}
          <p>{lecture.department}, {lecture.academic_year}</p>
          <p>{printTime(lecture.class_time)} / {printPlace(lecture.class_time_json)}</p>
          { this.state.hovered ? (<ResultRowDetail course={lecture} />) : null}
          <hr />
        </td>
      </tr>
    );
  }
}

const printTime = (timeString) => {
  if (timeString === undefined) timeString = '';
  const days = timeString.split('/').map((val) => {
    try {
      const splitted = val.split('(');
      const day = splitted[0];
      const start = Number(splitted[1].split('-')[0]) + 8;
      return day + start;
    } catch (ex) {
    }
  });
  return [...new Set(days)].join('-');
};

const printPlace = (timeJson) => {
  try {
    const parsed = [...new Set(timeJson.map(val => val.place))].join(' & ');
    return parsed;
  } catch (ex) {
  }
  return '';
};

export default connect(null, mapDispatchToProps)(ResultRow);
