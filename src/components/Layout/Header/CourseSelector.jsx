import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import { changeCoursebook } from 'actions/loadingActions';
import DropdownArrow from '../../Common/DropdownArrow.jsx';

// Utils for labels
const idxToString = [null, '1', 'S', '2', 'W'];
const courseBookToString = b => `${b.year}-${idxToString[b.semester]}`;

class CourseSelector extends Component {
  changeCoursebook = selected =>
    this.props.changeCoursebook(this.props.courseBooks[selected.value]);

  render() {
    const { courseBooks, currentBook } = this.props;
    const courseBookOptions = courseBooks.map((book, i) => ({
      value: i,
      label: courseBookToString(book),
      className: 'snutt__options',
    }));
    const currentBookIndex = courseBooks.findIndex(
      b => b.semester === currentBook.semester && b.year === currentBook.year,
    );
    return (
      <div id="semester-wrapper">
        <Select
          className="snutt__select"
          name="coursebook-selector"
          value={currentBookIndex}
          options={courseBookOptions}
          onChange={this.changeCoursebook}
          searchable={false}
          clearable={false}
          arrowRenderer={DropdownArrow}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ courseBook }) => {
  return {
    courseBooks: courseBook.available,
    currentBook: courseBook.current,
  };
};

export default connect(
  mapStateToProps,
  {
    changeCoursebook
  },
)(CourseSelector);
