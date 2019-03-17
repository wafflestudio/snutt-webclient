import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';

import Table from './Table';

import { createCourse, deleteLecture } from '../../../actions/tableActions';
import { addCourse } from '../../../actions';
const TableCapturer = lazy(() => import('./TableCapturer'));

function mapStateToProps(state) {
  const {
    hoveredCourse: previewed,
    courseBook,
    tableList: { viewLectures, tableMap, colorScheme },
  } = state;
  const { viewLectures: courses, viewTableId } = state.tableList;
  // Color course
  courses &&
    courses.forEach(c => {
      if (c.colorIndex && c.colorIndex < colorScheme.length) {
        c.color = colorScheme[c.colorIndex - 1];
      }
    });
  const viewTableTitle = tableMap[viewTableId]
    ? tableMap[viewTableId].title
    : '';
  const creditSum = viewLectures
    ? viewLectures.reduce((sum, lecture) => sum + lecture.credit, 0)
    : 0;
  return {
    hasNoTable: viewTableId === null,
    previewed,
    courseBook,
    courses,
    viewTableTitle,
    creditSum,
  };
}

const mapDispatchToProps = dispatch => ({
  handleDelete: _id => dispatch(deleteLecture(_id)),
  addCourse: course => dispatch(addCourse(course)),
  openCourse: () => dispatch(createCourse()),
});

class Timetable extends Component {
  createAndEditCourse = e => {
    e.preventDefault();
    if (this.props.hasNoTable) {
      alert('강의를 추가할 시간표가 없습니다. 시간표를 추가해주세요.');
      return;
    }
    this.props.openCourse();
  };

  render() {
    const { creditSum, viewTableTitle, ...tableProps } = this.props;
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
          <Suspense
            fallback={
              <div className="add-button btn-default">
                <span>캡쳐하기</span>
              </div>
            }
          >
            <TableCapturer title={viewTableTitle} />
          </Suspense>
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
