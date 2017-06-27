import React, { Component } from 'react';

export default class ResultRow extends Component {
  constructor() {
    super();
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.state = { hovered: false };
  }

  handleMouseEnter() {
    this.props.updateHover(this.props.rowIndex);
    this.setState({ hovered: true });
  }

  handleMouseLeave() {
    this.props.updateHover(-1);
    this.setState({ hovered: false });
  }

  render() {
    const cssClass = `tr-result${this.props.hoverComputed ? ' hovered' : ''}`;

    return (
      <tr
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className={cssClass}
      >
        <td>
          <h5>{this.props.course_title}</h5>
          <h6>{this.props.instructor} / {this.props.credit}학점</h6>
          <h6 className="pull-right">{this.props.course_number} / {this.props.lecture_number}</h6><br />
          <p>{this.props.department}, {this.props.academic_year}</p><br />
          <p>{printTime(this.props.class_time)} / {printPlace(this.props.class_time_json)}</p><br />
        </td>
        
      </tr>
    );
    /*
    <td>{this.props.course_title}</td>
        <td>{this.props.credit}</td>
        <td><nobr>{this.props.department}</nobr></td>
        <td>{printTime(this.props.class_time)}</td>
        <td>{printPlace(this.props.class_time_json)}</td>
        <td>{this.props.instructor}</td>
        <td><nobr>{this.props.remark}</nobr></td>
        */
  }
}

const printTime = (timeString) => {
  if (timeString === undefined) timeString = "";
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
