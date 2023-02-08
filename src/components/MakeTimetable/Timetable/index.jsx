import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';

import Table from './Table';

import {
  createCourse,
  deleteLecture,
  switchTable,
  createTable,
} from '../../../actions/tableActions';
import { addCourse } from '../../../actions';
const TableCapturer = lazy(() => import('./TableCapturer'));

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  handleDelete: _id => dispatch(deleteLecture(_id)),
  addCourse: course => dispatch(addCourse(course)),
  openCourse: () => dispatch(createCourse()),
  setTable: _id => dispatch(switchTable(_id)),
  addTable: () => dispatch(createTable()),
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
    const { viewTableId, viewTable, previewed, handleDelete } = this.props;

    const creditSum =
      viewTable && viewTable.lecture_list
        ? viewTable.lecture_list.reduce(
            (sum, lecture) => sum + lecture.credit,
            0,
          )
        : 0;
    const courses = (viewTable && viewTable.lecture_list) || [];

    return (
      <div id="timetable-container">
        <Table
          hasNoTable={!Boolean(viewTableId)}
          previewed={previewed}
          courses={courses}
          handleDelete={handleDelete}
        />
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
            <TableCapturer title={viewTable && viewTable.title} />
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
