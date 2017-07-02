import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addLecture, deleteLecture, editCourse } from '../../../actions/tableActions';
import showCourseDetail from './showCourseDetail.js';

function mapStateToProps(state) {
  const { viewYear, viewSemester } = state.tableList;
  const semesterStr = ['_', '1', 'S', '2', 'W'][viewSemester];
  return { searching: state.leftTabSearching, year: viewYear, semesterStr };
}

const mapDispatchToProps = dispatch => ({
  onAddLecture: course => dispatch(addLecture(course)),
  onDeleteLecture: id => dispatch(deleteLecture(id)),
  onEditCourse: course => dispatch(editCourse(course)),
});

class DetailRow extends Component {
  constructor() {
    super();
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleOpenDetail = this.handleOpenDetail.bind(this);
  }

  handleAdd() {
    this.props.onAddLecture(this.props.course);
  }

  handleOpenDetail() {
    const { year, semesterStr } = this.props;
    const { course_number, lecture_number } = this.props.course;
    showCourseDetail(year, semesterStr, course_number, lecture_number);
  }

  handleDelete() {
    this.props.onDeleteLecture(this.props.course._id);
  }

  handleEdit() {
    this.props.onEditCourse(this.props.course);
  }

  render() {
    const { searching } = this.props;
    return (
      <div>
        <span>{this.props.course.remark}</span>
        { searching ?
          <div className="buttons">
            <button
              className="btn btn-info"
              onClick={this.handleOpenDetail}
            >
              수강편람
            </button>
            <button
              className="btn btn-primary"
              onClick={this.handleAdd}
            >
              추가
            </button>
          </div> :
          <div className="buttons">
            <button
              className="btn btn-info"
              onClick={this.handleOpenDetail}
            >
              수강편람
            </button>
            <button
              className="btn btn-warning"
              onClick={this.handleEdit}
            >
              수정
            </button>
            <button
              className="btn btn-danger"
              onClick={() => { if (confirm("정말로 삭제하시겠습니까?")) this.handleDelete() }}
            >
              삭제
            </button>
          </div>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailRow);