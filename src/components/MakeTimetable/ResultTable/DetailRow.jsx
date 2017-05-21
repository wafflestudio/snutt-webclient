import React from 'react';
import { connect } from 'react-redux';

import ResultRow from './ResultRow.jsx';
import { addLecture, deleteLecture, editCourse } from '../../../actions/tableActions';
import showCourseDetail from './showCourseDetail.js';

function mapStateToProps(state) {
  const { year, semester } = state.courseBook.get('current');
  const semesterStr = ['_', '1', 'S', '2', 'W'][semester];
  return { searching: state.leftTabSearching, year, semesterStr };
}

const mapDispatchToProps = dispatch => ({
  onAddLecture: course => dispatch(addLecture(course)),
  onDeleteLecture: id => dispatch(deleteLecture(id)),
  onEditCourse: course => dispatch(editCourse(course)),
});

class DetailRow extends ResultRow {
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
    this.props.updateHover(-1);
    this.props.onDeleteLecture(this.props.course._id);
  }

  handleEdit() {
    this.props.onEditCourse(this.props.course);
  }

  render() {
    const { searching } = this.props;
    return (
      <tr
        className="tr-detail"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <td colSpan="8">
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
                onClick={this.handleDelete}
              >
                삭제
              </button>
            </div>
          }
        </td>
      </tr>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailRow);
