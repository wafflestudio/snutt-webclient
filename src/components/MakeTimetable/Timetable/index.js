import React, { Component } from 'react';
import { connect } from 'react-redux';

import Table from './Table';

import { createCourse, deleteLecture } from '../../../actions/tableActions';
import { addCourse } from '../../../actions';

function mapStateToProps(state) {
  const {
    hoveredCourse: previewed,
    courseBook,
    tableList: { viewLectures },
  } = state;
  const { viewLectures: courses, viewTableId } = state.tableList;
  const creditSum = viewLectures
    ? viewLectures.reduce((sum, lecture) => sum + lecture.credit, 0)
    : 0;

  return {
    hasNoTable: viewTableId === null,
    previewed,
    courseBook,
    courses,
    creditSum,
  };
}

const mapDispatchToProps = dispatch => ({
  handleDelete: _id => dispatch(deleteLecture(_id)),
  addCourse: course => dispatch(addCourse(course)),
  openCourse: () => dispatch(createCourse()),
});

class Timetable extends Component {
  constructor() {
    super();
    this.createAndEditCourse = this.createAndEditCourse.bind(this);
  }

  createAndEditCourse(e) {
    e.preventDefault();
    if (this.props.hasNoTable) {
      alert('강의를 추가할 시간표가 없습니다. 시간표를 추가해주세요.');
      return;
    }
    this.props.openCourse();
  }

  render() {
    const { creditSum, ...tableProps } = this.props;
    return (
      <div id="timetable-container">
        <Table {...tableProps} />
        <div className="table-info">
          <div
            className="add-button btn-default"
            onClick={this.createAndEditCourse}
          >
            <span>+ 직접 추가하기</span>
          </div>
          <div className="credit">{`총 ${creditSum} 학점`}</div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timetable);
