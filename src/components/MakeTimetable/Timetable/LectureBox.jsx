import React, { Component } from 'react';
import { connect } from 'react-redux';

import { editCourse } from '../../../actions/tableActions';
import { tableHoverCourse, tableUnhoverCourse } from '../../../actions';

import IconWrapper from '../../Common/IconWrapper';
import DeleteIconNormal from 'assets/ic-delete-white-normal.svg';
import DeleteIconHover from 'assets/ic-delete-white-over.svg';
import DeleteIconFocus from 'assets/ic-delete-white-pressed.svg';
import EditIconNormal from 'assets/ic-edit-white-normal.svg';
import EditIconHover from 'assets/ic-edit-white-over.svg';
import EditIconFocus from 'assets/ic-edit-white-pressed.svg';

const mapStateToProps = ({
  tableHoveredCourse,
  courseEditor: { isOpen: courseEditorOpened },
}) => ({
  courseEditorOpened,
  tableHoveredCourse,
});

const mapDispatchToProps = dispatch => ({
  onHover: course => dispatch(tableHoverCourse(course)),
  onUnhover: () => dispatch(tableUnhoverCourse()),
  onEdit: course => dispatch(editCourse(course)),
});

const DEFAULT_COLOR = { fg: '#1579C2', bg: '#94E6FE' };

class LectureBox extends Component {
  handleMouseEnter = () => this.props.onHover(this.props.course);

  handleMouseLeave = () => this.props.onUnhover();

  handleDelete = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      this.props.onDelete(this.props.course._id);
    }
  };

  handleEdit = () => {
    this.props.onUnhover();
    this.props.onEdit(this.props.course);
  };

  render() {
    const {
      length,
      course,
      isPreview,
      tableHoveredCourse,
      courseEditorOpened,
    } = this.props;
    const isHovered =
      !courseEditorOpened && tableHoveredCourse
        ? this.props.tableHoveredCourse._id === this.props.course._id
        : false;
    if (!course.color) {
      course.color = DEFAULT_COLOR;
    }
    const divStyle = {
      height: `${length * 20}px`,
      color: course.color.fg,
      backgroundColor: course.color.bg,
    };
    return (
      <div
        className={`course-div${isPreview ? ' preview' : ''}${
          isHovered ? ' hovered' : ''
        }`}
        style={divStyle}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        ref={node => {
          this.node = node;
        }}
      >
        <div className="title-box">
          <p>{this.props.course.course_title}</p>
          <p>
            <strong>{this.props.classroom}</strong>
          </p>
        </div>
        {isHovered ? (
          <div className="tool-box-wrapper">
            <div className="tool-box" style={{ color: course.color.bg }}>
              <IconWrapper
                onClick={this.handleEdit}
                normalIcon={<EditIconNormal />}
                focusedIcon={<EditIconFocus />}
                hoveredIcon={<EditIconHover />}
              />
              {this.props.onDelete !== undefined ? (
                <IconWrapper
                  onClick={this.handleDelete}
                  normalIcon={<DeleteIconNormal />}
                  focusedIcon={<DeleteIconFocus />}
                  hoveredIcon={<DeleteIconHover />}
                />
              ) : null}
            </div>
          </div>
        ) : null}
      </div> /** End of course-div */
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LectureBox);
