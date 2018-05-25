import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import ColorPicker from "./ColorPicker.jsx";
import timeJsonToMask from "./maskConverter";
import {
  addCustomLecture,
  updateLecture,
  closeCourse
} from "../../../actions/tableActions";
import JsonEditor from "./JsonEditor.jsx";

const mapStateToProps = state => {
  const { isOpen, course } = state.courseEditor;
  const { colorScheme } = state.tableList;
  return { isOpen, course, colorScheme };
};

const mapDispatchToProps = dispatch => ({
  onAddCustomLecture: editedLecture =>
    dispatch(addCustomLecture(editedLecture)),
  onUpdateLecture: (id, lecture) => {
    dispatch(updateLecture(id, lecture));
  },
  onCourseClose: () => dispatch(closeCourse())
});

class CourseEditor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleColorSelect = this.handleColorSelect.bind(this);
    this.renderInput = this.renderInput.bind(this);

    const { course } = props;
    const colorIndex =
      course.colorIndex > 0 || course.color
        ? course.colorIndex
        : Math.ceil(Math.random() * props.colorScheme.length);
    const color =
      colorIndex > 0 ? props.colorScheme[colorIndex - 1] : course.color;
    this.state = {
      isNew: Object.keys(course).length === 0,
      _id: course._id || "", // || for new course
      course_title: course.course_title || "",
      instructor: course.instructor || "",
      credit: course.credit || 0,
      class_time_mask: course.class_time_mask || "",
      class_time_json: course.class_time_json || [],
      remark: course.remark || "",
      color,
      colorIndex
    };
  }

  handleColorSelect = chosenColor => {
    this.setState(chosenColor);
  };

  handleJsonUpdate = updatedJson =>
    this.setState({ class_time_json: updatedJson });

  handleSave(e) {
    e.preventDefault();
    const {
      course_title,
      instructor,
      class_time_json,
      credit,
      remark,
      color,
      colorIndex
    } = this.state;
    const editedLecture = {
      course_title,
      instructor,
      class_time_mask: timeJsonToMask(class_time_json),
      class_time_json,
      remark,
      credit,
      colorIndex
    };
    if (colorIndex === 0) {
      editedLecture.color = color;
    }
    if (this.state.isNew) {
      // add new course
      this.props.onAddCustomLecture(editedLecture);
    } else {
      this.props.onUpdateLecture(this.state._id, editedLecture);
    }
  }

  handleClose(e) {
    e.preventDefault();
    this.props.onCourseClose();
  }

  handleChange(field, e) {
    this.setState({ [field]: e.target.value });
  }

  renderInput(field, key, placeholder, type = "text") {
    return (
      <div className="form-group">
        <label className="col-sm-2 control-label">{field}</label>
        <div className="col-sm-8">
          <input
            className="form-control"
            value={this.state[key]}
            onChange={this.handleChange.bind(this, key)}
            placeholder={placeholder}
            type={type}
          />
        </div>
      </div>
    );
  }

  render() {
    const { color, bgColor, class_time_json, isNew } = this.state;
    const title = isNew ? "내 강의 추가" : "강의 편집";
    const submitName = isNew ? "추가하기" : "저장하기";
    return (
      <Modal
        isOpen
        className="snutt__modal"
        onRequestClose={this.handleClose}
        overlayClassName="snutt__modal-overlay"
        portalClassName="snutt__course-editor"
        contentLabel="Lecture Edit Modal"
        style={{
          content: {
            border: `1px solid ${this.state.color.bg}`
          }
        }}
      >
        <p id="title">
          <strong>{title}</strong>
        </p>
        <hr />
        <form className="form-horizontal" onSubmit={this.handleSave}>
          {this.renderInput("강의명", "course_title", "예) 기초 영어")}
          {this.renderInput("선생님", "instructor", "예) 홍길동")}
          {/* Color Picker */}
          <div className="form-group">
            <label className="col-sm-2 control-label">색</label>
            <div className="col-sm-8">
              <ColorPicker
                currentColor={this.state.color}
                onChange={this.handleColorSelect}
              />
            </div>
          </div>
          {this.renderInput("학점", "credit", "예) 0", "number")}
          {this.renderInput("비고", "remark", "(없음)")}
          <div className="form-group">
            <label className="col-sm-2 control-label">시간</label>
            <div className="col-sm-10">
              <JsonEditor
                updateJson={this.handleJsonUpdate}
                class_time_json={this.state.class_time_json}
              />
            </div>
          </div>
          <hr />
          <div className="button-groups">
            <button className="btn btn-default" onClick={this.handleClose}>
              취소
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                borderColor: this.state.color.bg,
                backgroundColor: this.state.color.bg
              }}
            >
              {submitName}
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseEditor);
