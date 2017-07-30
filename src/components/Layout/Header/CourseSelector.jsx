import React, { Component } from 'react';

class CourseSelector extends Component {
  render() {
    return (
      <div id="semester-wrapper">
        <div className="semester current">
          2017-S
          &nbsp;
          <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true" />
        </div>
      </div>
    );
  }
}

export default CourseSelector;
