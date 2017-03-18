import React from 'react'
import PureRenderComponent from '../../PureRenderComponent.jsx'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import ColorPicker from './ColorPicker'
import timeJsonToMask from './maskConverter'
import contrast from '../../../utils/colorInvertor.js'
import { addCustomLecture, updateLecture, closeCourse } from '../../../actions/tableActions'
import JsonEditor from './JsonEditor.jsx'

class CourseEditor extends PureRenderComponent {
  constructor(props) {
    super(props)
    this.handleSave = this.handleSave.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleColorSelect = this.handleColorSelect.bind(this)
    this.renderInput = this.renderInput.bind(this)

    const defaultColor = { fg: "#1579C2", bg: "#94E6FE" }
    const { course } = props
    this.state = {
      isNew: Object.keys(course).length === 0,
      _id: course._id || '', // || for new course
      course_title: course.course_title || '',
      instructor: course.instructor || '',
      class_time_mask: course.class_time_mask || '',
      class_time_json: course.class_time_json || [],
      remark: course.remark || '',
      color: course.color || defaultColor,
    }
  }

  handleColorSelect = (chosenColor) => {
    const { fg, bg } = chosenColor
    this.setState({ color: { fg, bg }})
  }

  handleJsonUpdate = (updatedJson) => this.setState({class_time_json: updatedJson})

  handleSave(e) {
    e.preventDefault()
    const { dispatch } = this.props
    const { course_title, instructor, class_time_json, remark, color } = this.state
    const editedLecuture = {
      course_title,
      instructor,
      class_time_mask: timeJsonToMask(class_time_json),
      class_time_json,
      remark,
      color,
    }
    if (this.state.isNew) { //add new course
      dispatch(addCustomLecture(editedLecuture))
    } else {
      dispatch(updateLecture(this.state._id, editedLecuture))
    }
  }

  handleClose(e) {
    e.preventDefault()
    this.props.dispatch(closeCourse())
  }

  handleChange(field, e) {
    this.setState({ [field]: e.target.value })
  }

  renderInput(field, key) {
    return (
      <div className='form-group'>
        <label className='col-sm-2 control-label'>{field}</label>
        <div className='col-sm-8'>
          <input
            className='form-control'
            value={this.state[key]}
            onChange={this.handleChange.bind(this, key)}
          />
        </div>
      </div>
    )
  }

  render() {
    const { color, bgColor, class_time_json, isNew } = this.state
    const title = isNew ? '내 강의 추가' : '강의 편집'
    return (
      <Modal
        isOpen={true}
        className='snutt__modal'
        onRequestClose={this.handleClose}
        overlayClassName='snutt__modal-overlay'
        portalClassName='snutt__course-editor'
        style={{ content: {
          backgroundColor: this.state.color.bg,
          color: this.state.color.fg
        }}}
      >
        <h3>{title}</h3>
        <ColorPicker
          color={this.state.color.bg}
          onChange={this.handleColorSelect}
        />
        <form
          className='form-horizontal'
          onSubmit={this.handleSave}
        >
          {this.renderInput('제목', 'course_title')}
          {this.renderInput('선생님', 'instructor')}
          <div className='form-group'>
            <label className='col-sm-2 control-label'>시간</label>
            <div className='col-sm-7'>
              <JsonEditor
                updateJson={this.handleJsonUpdate}
                class_time_json={this.state.class_time_json}
              />
            </div>
          </div>
          {this.renderInput('비고', 'remark')}
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-7'>
              <p>
                <button type='submit' className='btn btn-primary'>
                  확인
                </button> {' '}
                <button
                  className='btn btn-default'
                  onClick={this.handleClose}
                >
                  취소
                </button>
              </p>
            </div>
          </div>
        </form>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  const { isOpen, course } = state.courseEditor
  return { isOpen, course }
}

export default connect(mapStateToProps)(CourseEditor)
