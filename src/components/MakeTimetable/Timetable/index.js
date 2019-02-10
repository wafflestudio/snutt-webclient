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
    tableList: { viewLectures, tableMap },
  } = state;
  const { viewLectures: courses, viewTableId } = state.tableList;
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

  captureTable = e => {
    e.preventDefault();
    const _browser = chrome;
    function onCaptured(imageUri) {
      console.log(imageUri);
    }

    function onError(error) {
      console.log(`Error: ${error}`);
    }
    const capturing = _browser.tabs.captureVisibleTab();
    capturing.then(onCaptured, onError);
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
