import React, { Component } from 'react';

import ArrowDownIcon from '../../../../assets/arrow-down.svg';

class CourseSelector extends Component {
  render() {
    return (
      <div id="semester-wrapper">
        <div className="semester current">
          2017-S
          &nbsp;
          <ArrowDownIcon id="drop" />
        </div>
      </div>
    );
  }
}

export default CourseSelector;
