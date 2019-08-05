import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResultRowButtons from './ResultRowButtons.jsx';

import {
  hoverCourse,
  unhoverCourse,
  tableHoverCourse,
  tableUnhoverCourse,
} from 'store/search/actions';

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
    const { hovered } = this.state;
    const cssClass = `tr-result${hovered ? ' hovered' : ''}`;
    const lecture = this.props.lecture;

    return (
      <tr
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className={cssClass}
      >
        <td>
          <span className="title">{lecture.course_title}</span>
          <span className="credit">
            {lecture.instructor} / {lecture.credit}학점
          </span>
          <h5 className="pull-right lecture-id">
            {lecture.course_number} / {lecture.lecture_number}
          </h5>
          <p className="department">
            {lecture.department}, {lecture.academic_year}
          </p>
          <p className="time">
            {printTime(lecture.class_time)} /{' '}
            {printPlace(lecture.class_time_json)}
          </p>
          {hovered ? (
            <div className="buttons-wrapper">
              <ResultRowButtons course={lecture} />
            </div>
          ) : null}
          {/* https://stackoverflow.com/questions/8501727/table-row-wont-contain-elements-with-positionabsolute */}
          {hovered && lecture.remark.length > 0 ? (
            <div className="remark">
              <hr />
              <span>{lecture.remark}</span>
            </div>
          ) : null}
          <hr className="bottom" />
        </td>
      </tr>
    );
  }
}

const printTime = timeString => {
  if (!timeString) {
    return '';
  }
  const days = timeString.split('/').map(val => {
    try {
      const splitted = val.split('(');
      const day = splitted[0];
      const start = Number(splitted[1].split('-')[0]) + 8;
      return day + start;
    } catch (ex) {
      return timeString;
    }
  });
  return [...new Set(days)].join('-');
};

const printPlace = timeJson => {
  try {
    const parsed = [...new Set(timeJson.map(val => val.place))].join(' & ');
    return parsed;
  } catch (ex) {}
  return '';
};

export default connect(
  null,
  mapDispatchToProps,
)(ResultRow);
